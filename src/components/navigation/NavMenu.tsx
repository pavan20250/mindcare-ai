'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  Building2,
  CreditCard,
  KeyRound,
  LayoutDashboard,
  ListChecks,
  Sparkles,
  ScrollText,
  Settings,
  Shield,
  ShieldCheck,
  User as UserIcon,
  Users,
} from 'lucide-react';

import type { PageKey, Role } from '@/lib/permissions';
import { getAccessiblePages, PAGES } from '@/lib/permissions';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

type PageDef = (typeof PAGES)[PageKey];

const CATEGORY_ORDER: Array<PageDef['category']> = ['Admin', 'SuperAdmin'];

const ICONS: Record<PageKey, React.ComponentType<{ className?: string }>> = {
  dashboard: LayoutDashboard,
  profile: UserIcon,
  chat: Sparkles,
  reports: BarChart3,

  team: Users,
  billing: CreditCard,
  audit_logs: ScrollText,

  user_management: ShieldCheck,
  role_management: Shield,
  system_settings: Settings,
  api_keys: KeyRound,
  global_analytics: Building2,
};

export function NavMenu({ role }: { role: Role }) {
  const pathname = usePathname();
  const pages = getAccessiblePages(role).filter(
    (key) => key !== 'dashboard' && key !== 'profile' && key !== 'chat' && key !== 'reports'
  );

  const byCategory = pages.reduce<Record<PageDef['category'], PageKey[]>>(
    (acc, key) => {
      const category = PAGES[key].category;
      acc[category].push(key);
      return acc;
    },
    { General: [], Admin: [], SuperAdmin: [] }
  );

  return (
    <>
      {CATEGORY_ORDER.map((category) => {
        const keys = byCategory[category];
        if (keys.length === 0) return null;
        return (
          <SidebarGroup key={category} className="p-1.5 pt-0">
            <SidebarGroupLabel className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.14em] px-1.5 mb-0.5">
              {category}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {keys.map((pageKey) => {
                  const meta = PAGES[pageKey];
                  const Icon = ICONS[pageKey] ?? ListChecks;
                  const active =
                    pathname === meta.href ||
                    (meta.href !== '/dashboard' && pathname?.startsWith(meta.href + '/'));
                  return (
                    <SidebarMenuItem key={pageKey}>
                      <SidebarMenuButton
                        asChild
                        isActive={active}
                        className={
                          active
                            ? 'bg-teal-50 text-teal-700 border border-teal-200/60 font-medium'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }
                      >
                        <Link href={meta.href}>
                          <Icon className="size-4" />
                          <span>{meta.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        );
      })}
    </>
  );
}

