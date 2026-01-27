import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

const BASE_URL = import.meta.env.VITE_API_URL;

export function usePortfolioAnalytics() {
  // Add these debug logs
  console.log("=== DEBUG === - use-portfolio.ts:8");
  console.log("VITE_API_URL: - use-portfolio.ts:9", import.meta.env.VITE_API_URL);
  console.log("api object: - use-portfolio.ts:10", api);
  console.log("api.portfolio: - use-portfolio.ts:11", api.portfolio);
  console.log("api.portfolio.getAnalytics: - use-portfolio.ts:12", api.portfolio.getAnalytics);
  console.log("api.portfolio.getAnalytics.path: - use-portfolio.ts:13", api.portfolio.getAnalytics.path);
  console.log("Type of path: - use-portfolio.ts:14", typeof api.portfolio.getAnalytics.path);
  console.log("=== END DEBUG === - use-portfolio.ts:15");

  return useQuery({
    queryKey: [api.portfolio.getAnalytics.path],
    queryFn: async () => {
      const url = `${BASE_URL}${api.portfolio.getAnalytics.path}`;
      console.log("Full URL: - use-portfolio.ts:21", url); // Debug line
      
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch portfolio analytics");
      return api.portfolio.getAnalytics.responses[200].parse(await res.json());
    },
    refetchInterval: 60000,
  });
}

export function useMarketHistory(symbol: string) {
  return useQuery({
    queryKey: [api.market.getHistory.path, symbol],
    queryFn: async () => {
      const url = buildUrl(api.market.getHistory.path, { symbol });
      const res = await fetch(url);
      if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error("Failed to fetch market history");
      }
      return api.market.getHistory.responses[200].parse(await res.json());
    },
    enabled: !!symbol,
  });
}
