import { qk } from '@/lib/query-keys';
import { getSession } from '@/modules/auth/service';
import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { useToast } from './use-toast';

export const useAuthProtection = (
  options?: Partial<Parameters<typeof useQuery>['0']>,
) => {
  const router = useRouter();
  const currentPath = usePathname();
  const toast = useToast();

  useQuery({
    ...options,
    queryKey: qk.session(),
    queryFn: async () => {
      getSession()
        .then((data) => {
          if (data.error || data.data.session === null) {
            router.replace(`/login?redirect=${currentPath}`);
          }
        })
        .catch(() => {
          toast.toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Unable to get session',
          });
        });
    },
  });
};
