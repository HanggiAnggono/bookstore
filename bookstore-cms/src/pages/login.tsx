import { Button } from '@/components/ui/button';
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Page from '@/layouts/Page';
import { qk } from '@/lib/query-keys';
import { getSession, login, loginFormSchema } from '@/modules/auth/service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

export default function LoginPage() {
  const toast = useToast();
  const router = useRouter();
  const { mutateAsync } = useMutation({
    mutationFn: (body: Parameters<typeof login>[0]) => {
      return axios.post('/api/auth/login', body);
    },
  });

  useQuery({
    queryKey: qk.session(),
    queryFn: () =>
      getSession().then((res) => {
        if (res.data.session) {
          router.replace('/');
        }
      }),
  });

  const form = useForm<(typeof loginFormSchema)['_type']>({
    resolver: zodResolver(loginFormSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = form;

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync(data)
      .then(() => {
        router.replace('/');
      })
      .catch((err) => {
        toast.toast({
          title: 'Error logging in',
          description: err.message,
        });
      });
  });

  return (
    <Page
      disableAuthProtection
      className="w-full min-h-screen pb-[20rem] flex justify-center items-center"
    >
      <div className="md:w-1/4">
        <Image width={400} height={400} src="/images/login.png" alt="Login" />
        <h1>Login to Bookstore CMS</h1>
        <Form {...form}>
          <form onSubmit={onSubmit} className="flex flex-col gap-2">
            <FormField
              name="email"
              render={() => {
                return (
                  <FormItem>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormMessage className="inline ml-3" />
                    <Input type="text" {...register('email')} />
                  </FormItem>
                );
              }}
            />

            <FormField
              name="password"
              render={() => {
                return (
                  <FormItem>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormMessage className="inline ml-3" />
                    <Input type="password" {...register('password')} />
                  </FormItem>
                );
              }}
            />

            <Button type="submit" disabled={!isValid} isLoading={isSubmitting}>
              Login
            </Button>
          </form>
        </Form>
      </div>
    </Page>
  );
}

LoginPage.getLayout = function getLayout(page: React.ReactElement) {
  return <>{page}</>;
};
