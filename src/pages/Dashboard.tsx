import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/use-auth";
import {
  BookOpen,
  Crosshair,
  Github,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Rocket,
  Search,
  Settings,
  Sprout,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

const NAV_GROUPS = [
  {
    label: "Workspace",
    items: [
      { to: "/dashboard", label: "Overview", icon: LayoutDashboard, end: true },
      { to: "/dashboard/search", label: "AI Search", icon: Search },
      { to: "/dashboard/reports", label: "Saved Reports", icon: BookOpen },
    ],
  },
  {
    label: "Signals",
    items: [
      { to: "/dashboard/trends", label: "Market Trends", icon: TrendingUp },
      { to: "/dashboard/funding", label: "Funding", icon: Wallet },
      { to: "/dashboard/product-hunt", label: "Product Hunt", icon: Rocket },
      { to: "/dashboard/github", label: "GitHub", icon: Github },
      { to: "/dashboard/reddit", label: "Reddit", icon: MessageSquare },
      { to: "/dashboard/competitors", label: "Competitors", icon: Crosshair },
      { to: "/dashboard/startups", label: "Startups", icon: Sprout },
    ],
  },
  {
    label: "Account",
    items: [{ to: "/dashboard/settings", label: "Settings", icon: Settings }],
  },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const initial = (user?.name?.[0] ?? user?.email?.[0] ?? "S").toUpperCase();

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 shrink-0 items-center border-b border-white/6 px-5">
        <button type="button" onClick={() => navigate("/")} className="transition-opacity hover:opacity-80">
          <BrandLogo />
        </button>
      </div>

      <nav className="scrollbar-thin flex-1 space-y-6 overflow-y-auto px-3 py-5">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-widest text-white/30">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-all",
                      isActive
                        ? "bg-blue-500/12 font-medium text-blue-300"
                        : "text-white/55 hover:bg-white/5 hover:text-white",
                    )
                  }
                >
                  <item.icon className="size-4 shrink-0" />
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="shrink-0 border-t border-white/6 p-3">
        <div className="flex items-center gap-3 rounded-xl border border-white/6 bg-white/3 p-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-sm font-bold text-white">
            {initial}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">
              {user?.name ?? "Guest researcher"}
            </p>
            <p className="truncate text-[11px] text-white/40">
              {user?.email ?? "Anonymous session"}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 shrink-0 text-white/40 hover:text-white"
            onClick={handleSignOut}
            title="Sign out"
          >
            <LogOut className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const pageTitle = useMemo(() => {
    const flat = NAV_GROUPS.flatMap((g) => g.items);
    const current = flat.find((i) =>
      i.end ? location.pathname === i.to : location.pathname.startsWith(i.to),
    );
    return current?.label ?? "Dashboard";
  }, [location.pathname]);

  const initial = (user?.name?.[0] ?? user?.email?.[0] ?? "S").toUpperCase();

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 border-r border-white/6 bg-[#0d0d11] lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar + app (Sheet must wrap its trigger) */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-64 border-white/8 bg-[#0d0d11] p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <SidebarContent onNavigate={() => setMobileOpen(false)} />
        </SheetContent>

      <div className="lg:pl-60">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-white/6 bg-[#0b0b0d]/80 px-4 backdrop-blur-xl sm:px-6">
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white/60 lg:hidden">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>

          <div className="hidden items-center gap-2 sm:flex">
            <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
              <span className="size-1.5 animate-sf-pulse rounded-full bg-emerald-400" />
              7 sources live
            </span>
            <span className="text-xs text-white/30">{pageTitle}</span>
          </div>

          <button
            type="button"
            onClick={() => navigate("/dashboard/search")}
            className="mx-auto flex h-9 w-full max-w-md items-center gap-2.5 rounded-lg border border-white/8 bg-white/4 px-3.5 text-sm text-white/35 transition-colors hover:border-white/15 hover:text-white/50"
          >
            <Search className="size-4" />
            Ask anything about startups…
            <kbd className="ml-auto hidden rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-white/40 md:block">
              ⌘K
            </kbd>
          </button>

          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-xs font-bold text-white">
            {initial}
          </span>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
      </Sheet>
    </div>
  );
}
