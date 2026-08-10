import { redirect } from 'next/navigation';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar';
import { DashboardHeader } from '@/components/layout/dashboard-header';
import { getNavItemsByRole } from '@/lib/dashboard-nav';
import { getMe } from '@/service/getMe';

export default async function DashboardGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getMe();

  if (!user) {
    redirect('/login');
  }

  const navItems = getNavItemsByRole(user.role);

  return (
    <SidebarProvider>
      <DashboardSidebar navItems={navItems} />
      <SidebarInset>
        <DashboardHeader user={user} />
        <main className="flex-1 space-y-6 p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}