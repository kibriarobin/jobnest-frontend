import { Role, TRole } from '@/lib/type';

export type TIconName =
  | 'LayoutDashboard'
  | 'FileText'
  | 'Bookmark'
  | 'User'
  | 'Briefcase'
  | 'Users'
  | 'BarChart3'
  | 'Settings'
  | 'Building2'
  | 'Layers'
  | 'FolderKanban'
  | 'ClipboardList';

export type TNavItem = {
  title: string;
  href: string;
  icon: TIconName;
};

const candidateNav: TNavItem[] = [
  { title: 'Overview', href: '/candidate-dashboard', icon: 'LayoutDashboard' },
  { title: 'My Applications', href: '/candidate-dashboard/applications', icon: 'FileText' },
  { title: 'Saved Jobs', href: '/candidate-dashboard/saved-jobs', icon: 'Bookmark' },
  { title: 'Profile Settings', href: '/candidate-dashboard/profile', icon: 'User' },
];

const employerNav: TNavItem[] = [
  { title: 'Overview', href: '/employer-dashboard', icon: 'LayoutDashboard' },
  { title: 'Post a Job', href: '/employer-dashboard/create-jobs', icon: 'Briefcase' },
  { title: 'Manage Jobs', href: '/employer-dashboard/manage-jobs', icon: 'FolderKanban' },
  { title: 'Applicants', href: '/employer-dashboard/applicants', icon: 'ClipboardList' },
  { title: 'Analytics', href: '/employer-dashboard/analytics', icon: 'BarChart3' },
  { title: 'Company Settings', href: '/employer-dashboard/settings', icon: 'Settings' },
];

const adminNav: TNavItem[] = [
  { title: 'Overview', href: '/admin-dashboard', icon: 'LayoutDashboard' },
  { title: 'Manage Users', href: '/admin-dashboard/manage-users', icon: 'Users' },
  { title: 'Manage Jobs', href: '/admin-dashboard/manage-jobs', icon: 'FolderKanban' },
  { title: 'Manage Categories', href: '/admin-dashboard/categories', icon: 'Layers' },
  { title: 'Manage Companies', href: '/admin-dashboard/manage-companies', icon: 'Building2' },
  { title: 'Analytics', href: '/admin-dashboard/analytics', icon: 'BarChart3' },
  { title: 'Profile Settings', href: '/admin-dashboard/settings', icon: 'Settings' },
];

export function getNavItemsByRole(role: TRole): TNavItem[] {
  if (role === Role.CANDIDATE) {
    return candidateNav;
  } else if (role === Role.EMPLOYER) {
    return employerNav;
  } else {
    return adminNav;
  }
}