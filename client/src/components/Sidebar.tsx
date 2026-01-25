import { Link, useLocation } from "wouter";
import { LayoutDashboard, LineChart, PieChart, Settings, LogOut, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Overview", href: "/" },
  { icon: LineChart, label: "Market Data", href: "/market" },
  { icon: PieChart, label: "Analysis", href: "/analysis" }, 
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="w-64 border-r border-border bg-card/30 flex flex-col h-screen sticky top-0 backdrop-blur-sm hidden md:flex">
      <div className="p-6">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-emerald-300 flex items-center justify-center shadow-lg shadow-primary/20">
            <Wallet className="text-primary-foreground w-6 h-6" />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg leading-tight">FinDash</h1>
            <p className="text-xs text-muted-foreground">Portfolio Manager</p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = location === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative overflow-hidden",
                isActive 
                  ? "text-primary-foreground bg-primary shadow-lg shadow-primary/25" 
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground")} />
              <span>{item.label}</span>
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]" />
              )}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-border/50">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-muted-foreground hover:text-rose-400 hover:bg-rose-400/10 transition-colors">
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
