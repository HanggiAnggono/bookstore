import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ColorModeProvider } from './ColorModeProvider';

const queryClient = new QueryClient();

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ColorModeProvider>{children}</ColorModeProvider>
    </QueryClientProvider>
  );
}
