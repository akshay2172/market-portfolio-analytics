import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

export function usePortfolioAnalytics() {
  return useQuery({
    queryKey: [api.portfolio.getAnalytics.path],
    queryFn: async () => {
      const res = await fetch(api.portfolio.getAnalytics.path);
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
