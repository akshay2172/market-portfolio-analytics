import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

const BASE_URL = import.meta.env.VITE_API_URL;

export function usePortfolioAnalytics() {
  return useQuery({
    queryKey: [api.portfolio.getAnalytics.path],
    queryFn: async () => {
         const fullUrl = `${BASE_URL}${api.portfolio.getAnalytics.path}`;
      const res = await fetch(fullUrl);
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
      const url = `${BASE_URL}${buildUrl(api.market.getHistory.path, { symbol })}`
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
