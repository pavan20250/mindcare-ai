'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';

import {
  LayoutDashboard,
  MessageCircle,
  Heart,
  Calendar,
  BookOpen,
  BarChart3,
  Settings,
  LogOut,
  User,
  Sparkles,
} from 'lucide-react';

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
  SidebarSeparator,
} from '@/components/ui/sidebar';
import type { Role } from '@/lib/permissions';
import { NavMenu } from '@/components/navigation/NavMenu';

interface UserProps {
  email: string;
  name?: string;
  role?: 'user' | 'admin' | 'superadmin';
  roleLabel?: string;
}

interface AppSidebarProps {
  user: UserProps;
}

const INTAKE_HREF = '/demo';

const NAV_LINKS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/chat', label: 'Chat', icon: Sparkles },
  { href: INTAKE_HREF, label: 'Clinical intake', icon: MessageCircle, primary: true },
  { href: '/care', label: 'My care', icon: Heart },
  { href: '/appointments', label: 'Appointments', icon: Calendar },
  { href: '/resources', label: 'Resources', icon: BookOpen },
  { href: '/reports', label: 'Reports', icon: BarChart3 },
] as const;

export function AppSidebar({ user }: AppSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const role = (user.role ?? 'user') as Role;

  const userDisplayName = useMemo(() => {
    return user.name || user.email.split('@')[0];
  }, [user]);

  const handleSignOut = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
      router.refresh();
    } catch (error) {
      console.error('Logout failed', error);
    }
  }, [pathname, router]);

  const isActiveRoute = useCallback(
    (href: string) => pathname === href || pathname.startsWith(href),
    [pathname]
  );

  return (
    <Sidebar
      side="left"
      variant="sidebar"
      collapsible="icon"
      className="border-r border-slate-200"
    >
      {/* HEADER */}
      <SidebarHeader className="border-b border-slate-200/80 bg-white">
        <Link href="/dashboard" className="flex items-center font-semibold">
          <Image
            src="/NeuralCare_logo/website_logo.png"
            alt="NeuralCare AI"
            width={180}
            height={100}
            priority
            className="h-40 -mb-14 -mt-12 w-auto"
          />
        </Link>
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent className="bg-white">

        {/* ACCOUNT */}
        <SidebarGroup className="p-1.5 pb-0">
          <SidebarGroupLabel className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.14em] px-1.5 mb-0.5">
            Account
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <div className="flex items-center gap-2.5 px-1.5 py-1">
              <div className="flex size-7 items-center justify-center rounded-full bg-teal-50 border border-teal-100 text-teal-600">
                <User className="size-3.5" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium text-slate-800 leading-tight">
                  {userDisplayName}
                </p>

                <p className="truncate text-[11px] text-slate-400 leading-tight">
                  {user.roleLabel ?? 'User'}
                </p>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="bg-slate-200/80 mx-2 my-1" />

        {/* GENERAL */}
        <SidebarGroup className="p-1.5 pt-0">
          <SidebarGroupLabel className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.14em] px-1.5 mb-0.5">
            General
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_LINKS.map(({ href, label, icon: Icon }) => {
                const isActive = isActiveRoute(href);
                const isIntake = href === INTAKE_HREF;

                return (
                  <SidebarMenuItem key={href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={
                        isActive
                          ? 'bg-teal-50 text-teal-700 border border-teal-200/60 font-medium'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }
                    >
                      <Link href={href}>
                        <Icon className="size-4" />
                        <span>{label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="bg-slate-200/80 mx-2 my-1" />

        {/* ROLE-BASED NAVIGATION (RBAC) */}
        <NavMenu role={role} />
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className="border-t border-slate-200/80 bg-white">
        <SidebarMenu>

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === '/settings'}
              className={
                pathname === '/settings'
                  ? 'bg-teal-50 text-teal-700 border border-teal-200/60 font-medium'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }
            >
              <Link href="/settings">
                <Settings className="size-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleSignOut}
              className="text-slate-400 hover:text-red-600 hover:bg-red-50"
            >
              <LogOut className="size-4" />
              <span>Sign out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}