import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  GraduationCap,
  Bus,
  CalendarCheck,
  Wallet,
  MessageSquareHeart,
  Sparkles,
  Settings,
} from "lucide-react";
import type { ReactNode } from "react";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/learners", label: "Learners", icon: GraduationCap },
  { to: "/fleet", label: "Fleet", icon: Bus },
  { to: "/bookings", label: "Bookings", icon: CalendarCheck },
  { to: "/revenue", label: "Revenue", icon: Wallet },
  { to: "/notifications", label: "Parent Notifications", icon: MessageSquareHeart },
  { to: "/assistant", label: "AI Assistant", icon: Sparkles },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="bg-app-gradient min-h-screen">
      <div className="flex min-h-screen w-full">
        {/* Sidebar */}
        <aside className="hidden lg:flex w-64 shrink-0 flex-col gap-2 p-5 sticky top-0 h-screen">
          <div className="flex items-center gap-3 px-2 py-3">
            <div className="bg-brand-gradient grid h-10 w-10 place-items-center rounded-2xl text-white shadow-lg">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="font-display text-lg font-bold leading-tight">PhoziFlow</div>
              <div className="text-xs text-muted-foreground">AI Transport OS</div>
            </div>
          </div>

          <nav className="mt-4 flex flex-1 flex-col gap-1">
            {nav.map((item) => {
              const active = pathname === item.to;
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={
                    "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all " +
                    (active
                      ? "bg-brand-gradient text-white shadow-md"
                      : "text-foreground/70 hover:bg-white hover:text-foreground")
                  }
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="card-float p-4 text-xs text-muted-foreground">
            <div className="font-semibold text-foreground mb-1">Need help?</div>
            Ask the AI Assistant for tips on trips, revenue and parent replies.
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0">
          {/* Top bar (mobile nav) */}
          <header className="lg:hidden sticky top-0 z-20 backdrop-blur bg-white/70 border-b border-white/60">
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="bg-brand-gradient grid h-9 w-9 place-items-center rounded-xl text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="font-display font-bold">PhoziFlow AI</div>
            </div>
            <div className="flex gap-1 overflow-x-auto px-3 pb-3">
              {nav.map((item) => {
                const active = pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={
                      "whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium " +
                      (active
                        ? "bg-brand-gradient text-white"
                        : "bg-white text-foreground/70")
                    }
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </header>

          <main className="p-5 md:p-8 max-w-[1400px] mx-auto">{children}</main>
        </div>
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 mb-6 sm:flex sm:flex-wrap sm:justify-between">
      <div className="min-w-0">
        <h1 className="truncate text-2xl md:text-3xl font-bold">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {actions && <div className="flex shrink-0 gap-2">{actions}</div>}
    </div>
  );
}
