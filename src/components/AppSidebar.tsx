'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  MessageCircle,
  Heart,
  Calendar,
  BookOpen,
  Home,
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
  { href: INTAKE_HREF, label: 'Intake', icon: MessageCircle, primary: true },
  { href: '/care', label: 'My care', icon: Heart },
  { href: '/appointments', label: 'Appointments', icon: Calendar },
  { href: '/resources', label: 'Resources', icon: BookOpen },
  { href: '/', label: 'Home', icon: Home },
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
    <Sidebar side="left" variant="sidebar" collapsible="offcanvas" className="border-r-0">
      <SidebarHeader className="border-b border-white/[0.06] bg-white/[0.02]">
        <Link
          href="/"
          className="flex items-center gap-2 px-2 py-3 font-semibold"
        >
          <span className="bg-gradient-to-r from-teal-300 to-teal-500 bg-clip-text text-transparent text-lg">MindCare AI</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="bg-[#0b1120]/80 backdrop-blur-xl">
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-500">
            Account
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="flex items-center gap-3 rounded-md px-2 py-2.5">
              <div className="flex size-9 items-center justify-center rounded-full bg-teal-500/10 text-teal-400">
                <User className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-200">
                  {user.email}
                </p>
                <p className="truncate text-xs text-slate-500">
                  Signed in
                </p>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator className="bg-white/[0.06]" />
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-500">
            Get started
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <TooltipProvider delayDuration={300}>
              <SidebarMenu>
                {NAV_LINKS.map(({ href, label, icon: Icon }) => {
                  const isIntake = href === INTAKE_HREF;
                  const locked = !isIntake && !intakeCompleted;
                  const isActive =
                    pathname === href ||
                    (href !== '/' && pathname.startsWith(href));
                  return (
                    <SidebarMenuItem key={href}>
                      {locked ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <SidebarMenuButton
                              isActive={false}
                              className="pointer-events-none opacity-40 text-slate-400"
                            >
                              <Lock className="size-4 text-slate-600" />
                              <span>{label}</span>
                              <Badge variant="secondary" className="ml-auto text-[10px] px-1.5 py-0 bg-white/[0.06] text-slate-500 border-white/[0.08]">
                                Complete intake
                              </Badge>
                            </SidebarMenuButton>
                          </TooltipTrigger>
                          <TooltipContent side="right" className="bg-[#141a2e] border-white/10 text-slate-300">
                            Complete your intake to unlock
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <SidebarMenuButton asChild isActive={isActive} className={isActive ? 'bg-teal-500/10 text-teal-300 border border-teal-500/20' : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'}>
                          <Link href={href}>
                            {isIntake && intakeCompleted ? (
                              <CheckCircle2 className="size-4 text-teal-400" />
                            ) : (
                              <Icon className="size-4" />
                            )}
                            <span>{label}</span>
                            {isIntake && !intakeCompleted && (
                              <Badge className="ml-auto bg-teal-500/20 text-teal-300 text-[10px] px-1.5 py-0 border border-teal-500/30">
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
      <SidebarFooter className="border-t border-white/[0.06] bg-[#0b1120]/80">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleSignOut} className="text-slate-500 hover:text-slate-300 hover:bg-white/[0.06]">
              <LogOut className="size-4" />
              <span>Sign out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
