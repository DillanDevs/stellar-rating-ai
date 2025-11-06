import { Home, Search, Zap, Box, Activity, DollarSign, Settings } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Overview", href: "/", icon: Home },
  { name: "Explorar", href: "/explore", icon: Search },
  { name: "Predicciones", href: "/predict", icon: Zap },
  { name: "Modelos", href: "/models", icon: Box },
  { name: "Monitoreo", href: "/monitor", icon: Activity },
  { name: "FinOps", href: "/finops", icon: DollarSign },
  { name: "Configuración", href: "/settings", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r bg-sidebar">
      <nav className="flex h-full flex-col gap-2 p-4">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            end={item.href === "/"}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
            activeClassName="bg-sidebar-accent text-sidebar-accent-foreground"
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
