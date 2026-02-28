'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  MessageCircle,
  Heart,
  Calendar,
  BookOpen,
  LogOut,
  User,
  Lock,
  CheckCircle2,
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { useIntake } from '@/contexts/IntakeContext';

interface AppSidebarProps {
  user: { email: string };
}

const INTAKE_HREF = '/demo';

const NAV_LINKS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: INTAKE_HREF, label: 'Clinical intake', icon: MessageCircle, primary: true },
  { href: '/care', label: 'My care', icon: Heart },
  { href: '/appointments', label: 'Appointments', icon: Calendar },
  { href: '/resources', label: 'Resources', icon: BookOpen },
] as const;

export function AppSidebar({ user }: AppSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { intakeCompleted } = useIntake();

  const handleSignOut = async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    router.replace('/login?next=' + encodeURIComponent(pathname));
    router.refresh();
  };

  return (
    <Sidebar side="left" variant="sidebar" collapsible="offcanvas" className="border-r border-slate-200">
      <SidebarHeader className="border-b border-slate-200/80 bg-white px-3 py-2">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="text-teal-700 text-base font-bold tracking-tight">MindCare AI</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="bg-white">
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
                  {user.email.split('@')[0].slice(0, 5)}
                </p>
                <p className="truncate text-[11px] text-slate-400 leading-tight">
                  Patient
                </p>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator className="bg-slate-200/80 mx-2 my-1" />
        <SidebarGroup className="p-1.5 pt-0">
          <SidebarGroupLabel className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.14em] px-1.5 mb-0.5">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <TooltipProvider delayDuration={300}>
              <SidebarMenu>
                {NAV_LINKS.map(({ href, label, icon: Icon }) => {
                  const isIntake = href === INTAKE_HREF;
                  const isDashboard = href === '/dashboard';
                  const locked = !isDashboard && !isIntake && !intakeCompleted;
                  const isActive =
                    pathname === href || pathname.startsWith(href);
                  return (
                    <SidebarMenuItem key={href}>
                      {locked ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <SidebarMenuButton
                              isActive={false}
                              className="pointer-events-none opacity-40 text-slate-400"
                            >
                              <Lock className="size-4 text-slate-400" />
                              <span>{label}</span>
                              <Badge variant="secondary" className="ml-auto text-[10px] px-1.5 py-0 bg-slate-100 text-slate-400 border border-slate-200">
                                Complete intake
                              </Badge>
                            </SidebarMenuButton>
                          </TooltipTrigger>
                          <TooltipContent side="right" className="bg-white border-slate-200 text-slate-600 shadow-lg">
                            Complete your intake to unlock
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <SidebarMenuButton asChild isActive={isActive} className={isActive ? 'bg-teal-50 text-teal-700 border border-teal-200/60 font-medium' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}>
                          <Link href={href}>
                            {isIntake && intakeCompleted ? (
                              <CheckCircle2 className="size-4 text-teal-600" />
                            ) : (
                              <Icon className="size-4" />
                            )}
                            <span>{label}</span>
                            {isIntake && !intakeCompleted && (
                              <Badge className="ml-auto bg-teal-50 text-teal-700 text-[10px] px-1.5 py-0 border border-teal-200">
                                Step 1
                              </Badge>
                            )}
                          </Link>
                        </SidebarMenuButton>
                      )}
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </TooltipProvider>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-slate-200/80 bg-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleSignOut} className="text-slate-400 hover:text-red-600 hover:bg-red-50">
              <LogOut className="size-4" />
              <span>Sign out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
