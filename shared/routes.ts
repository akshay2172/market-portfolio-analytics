
import { z } from 'zod';
import { marketData } from './schema';

export const errorSchemas = {
  internal: z.object({
    message: z.string(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
};

export const api = {
  market: {
    getHistory: {
      method: 'GET' as const,
      path: '/api/market/:symbol',
      responses: {
        200: z.array(z.custom<typeof marketData.$inferSelect>()),
        404: errorSchemas.notFound,
      },
    },
  },
  portfolio: {
    getAnalytics: {
      method: 'GET' as const,
      path: '/api/portfolio/analytics',
      responses: {
        200: z.object({
          summary: z.object({
            totalValue: z.number(),
            totalReturn: z.number(),
            totalReturnPercent: z.number(),
            dayChange: z.number(),
            dayChangePercent: z.number(),
          }),
          assets: z.array(z.object({
            symbol: z.string(),
            currentPrice: z.number(),
            allocation: z.number(),
            return: z.number(),
            contribution: z.number(),
          })),
          history: z.array(z.object({
            date: z.string(),
            value: z.number(),
          })),
        }),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type MarketDataResponse = z.infer<typeof api.market.getHistory.responses[200]>;
export type PortfolioAnalyticsResponse = z.infer<typeof api.portfolio.getAnalytics.responses[200]>;
