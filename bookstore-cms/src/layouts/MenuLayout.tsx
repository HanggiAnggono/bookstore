import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  Blocks,
  BookCheck,
  BookCopy,
  Home,
  Info,
  LogOutIcon,
  LucideBackpack,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';

const items = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Books',
    url: '/books',
    icon: BookCopy,
  },
  {
    title: 'Authors',
    url: '/authors',
    icon: User,
  },
  {
    title: 'Inventory',
    url: '/inventory',
    icon: LucideBackpack,
  },
  {
    title: 'Genres',
    url: '/genre',
    icon: Blocks,
  },
  {
    title: 'Orders',
    url: '/order',
    icon: BookCheck,
  },
  {
    title: 'About',
    url: '/about',
    icon: Info,
  },
];

export function MenuLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Books Management</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="flex flex-col gap-2">
          <ThemeToggle />
          <SidebarMenuButton asChild>
            <Link href="/logout">
              <LogOutIcon /> Logout
            </Link>
          </SidebarMenuButton>
        </SidebarFooter>
      </Sidebar>
      <main className="w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
