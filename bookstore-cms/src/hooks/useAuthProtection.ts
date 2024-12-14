import { qk } from '@/lib/query-keys';
import { getSession } from '@/modules/auth/service';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useAuthProtection = (
  options?: Partial<Parameters<typeof useQuery>['0']>,
) => {
  const router = useRouter();

  const { data, isLoading } = useQuery({
    ...options,
    queryKey: qk.session(),
    queryFn: async () => {
      getSession()
        .then((data) => {
          if (data.error || data.data.session === null) {
            router.replace('/login');
          }
        })
        .catch(() => {
          router.replace('/login');
        });
    },
  });
};
