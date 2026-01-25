
import { pgTable, text, serial, integer, boolean, timestamp, numeric, doublePrecision } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";


export const marketData = pgTable("market_data", {
  id: serial("id").primaryKey(),
  symbol: text("symbol").notNull(),
  date: timestamp("date").notNull(),
  open: doublePrecision("open").notNull(),
  high: doublePrecision("high").notNull(),
  low: doublePrecision("low").notNull(),
  close: doublePrecision("close").notNull(),
  volume: integer("volume").notNull(),
});

export const insertMarketDataSchema = createInsertSchema(marketData).omit({ id: true });



export type MarketData = typeof marketData.$inferSelect;
export type InsertMarketData = z.infer<typeof insertMarketDataSchema>;


export type PortfolioSummary = {
  totalValue: number;
  totalReturn: number;
  totalReturnPercent: number;
  dayChange: number;
  dayChangePercent: number;
};

export type AssetPerformance = {
  symbol: string;
  currentPrice: number;
  allocation: number;
  return: number;
  contribution: number;
};

export type PortfolioHistoryPoint = {
  date: string;
  value: number;
};

export type PortfolioAnalyticsResponse = {
  summary: PortfolioSummary;
  assets: AssetPerformance[];
  history: PortfolioHistoryPoint[];
};

export type MarketDataResponse = MarketData[];


export const PORTFOLIO_TICKERS = ["AAPL", "MSFT", "GOOGL", "AMZN", "META"];
