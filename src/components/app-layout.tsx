import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  BarChart3,
  Compass,
  Bot,
  BookMarked,
  Star,
  FileText,
  Settings,
  Users,
  Search,
  Bell,
  Sparkles,
} from "lucide-react";
import type { ReactNode } from "react";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/indicadores", label: "Indicadores", icon: BarChart3 },
  { to: "/explorador", label: "Explorador de Dados", icon: Compass },
  { to: "/assistente", label: "Assistente IA", icon: Bot },
  { to: "/biblioteca", label: "Biblioteca", icon: BookMarked },
  { to: "/favoritos", label: "Favoritos", icon: Star },
  { to: "/relatorios", label: "Relatórios", icon: FileText },
] as const;

export function AppLayout({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col bg-sidebar text-sidebar-foreground lg:flex">
        <div className="flex items-center gap-2 px-6 py-5 border-b border-sidebar-border">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="text-base font-bold tracking-tight">i.Maq BI</div>
            <div className="text-[11px] text-sidebar-foreground/60 truncate">
              Inteligência para Gestão Pública
            </div>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {nav.map((item) => {
            const active =
              item.to === "/"
                ? pathname === "/"
                : pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                <Icon className="shrink-0" size={18} />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-sidebar-border px-4 py-4">
          <div className="rounded-lg bg-sidebar-accent/60 p-3 text-xs text-sidebar-foreground/80">
            <div className="font-semibold text-sidebar-foreground mb-1">
              Município
            </div>
            Elói Mendes
          </div>
        </div>
      </aside>

      <div className="flex-1 lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/80 px-6 backdrop-blur">
          <div className="flex items-center gap-2 lg:hidden">
            <div className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-bold">i.Maq BI</span>
          </div>
          <div className="relative ml-auto hidden md:block w-full max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              className="h-9 w-full rounded-lg border border-input bg-card pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
              placeholder="Buscar indicadores, datasets, relatórios..."
            />
          </div>
          <button className="relative grid h-9 w-9 place-items-center rounded-lg border border-border bg-card hover:bg-muted">
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive" />
          </button>
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
              MR
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-semibold leading-tight">Maria Ribeiro</div>
              <div className="text-xs text-muted-foreground leading-tight">
                Secretária de Finanças
              </div>
            </div>
          </div>
        </header>
        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
