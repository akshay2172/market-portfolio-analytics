import { ReactNode } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change?: number;
  changeLabel?: string;
  icon: ReactNode;
  delay?: number;
}

export function MetricCard({ title, value, change, changeLabel, icon, delay = 0 }: MetricCardProps) {
  const isPositive = change && change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className="glass-panel rounded-2xl p-6 relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500 transform group-hover:scale-110">
        <div className="text-primary">{icon}</div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
            {icon}
          </div>
          <span className="text-sm font-medium text-muted-foreground">{title}</span>
        </div>

        <div>
          <h3 className="text-3xl font-bold tracking-tight text-white mb-1">
            {value}
          </h3>
          
          {change !== undefined && (
            <div className="flex items-center gap-2 text-sm">
              <span className={cn(
                "flex items-center gap-1 font-semibold px-2 py-0.5 rounded-md",
                isPositive 
                  ? "text-emerald-400 bg-emerald-400/10" 
                  : "text-rose-400 bg-rose-400/10"
              )}>
                {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {isPositive ? "+" : ""}{change.toFixed(2)}%
              </span>
              <span className="text-muted-foreground text-xs">{changeLabel || "vs yesterday"}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
