import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
const BASE_URL = import.meta.env.VITE_API_URL;

export function usePortfolioAnalytics() {
  return useQuery({
    queryKey: ["portfolio-analytics"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/api/portfolio/analytics`);
      if (!res.ok) throw new Error("Failed to fetch portfolio analytics");
      return res.json();
    },
    refetchInterval: 60000,
  });
}

export function useMarketHistory(symbol: string) {
  return useQuery({
    queryKey: ["market-history", symbol],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/api/market/history?symbol=${symbol}`);
      if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error("Failed to fetch market history");
      }
      return res.json();
    },
    enabled: !!symbol,
  });
}
