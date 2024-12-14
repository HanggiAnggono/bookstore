import { LoadingState } from '@/components/ui/LoadingState';
import { logout } from '@/modules/auth/service';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function LogoutPage() {
  const router = useRouter();
  const { mutate, error, isPending } = useMutation({
    mutationFn: () => {
      return logout();
    },
    onSuccess: () => {
      router.replace('/login');
    },
  });

  useEffect(() => {
    mutate();
  }, [mutate]);

  return (
    <div className="flex min-h-screen items-center">
      <div className=" w-full flex flex-col items-center">
        <div className="w-full">
          {isPending ? (
            <LoadingState text="Logging out..." />
          ) : error ? (
            <p>{error.message}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
