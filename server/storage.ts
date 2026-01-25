
import { db } from "./db";
import { marketData, type MarketData, type InsertMarketData } from "@shared/schema";
import { eq, and, gte, asc } from "drizzle-orm";

export interface IStorage {
  getMarketData(symbol: string): Promise<MarketData[]>;
  getMarketDataRange(symbol: string, startDate: Date): Promise<MarketData[]>;
  saveMarketData(data: InsertMarketData[]): Promise<void>;
  hasDataForSymbol(symbol: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getMarketData(symbol: string): Promise<MarketData[]> {
    return await db.select()
      .from(marketData)
      .where(eq(marketData.symbol, symbol))
      .orderBy(asc(marketData.date));
  }

  async getMarketDataRange(symbol: string, startDate: Date): Promise<MarketData[]> {
    return await db.select()
      .from(marketData)
      .where(and(
        eq(marketData.symbol, symbol),
        gte(marketData.date, startDate)
      ))
      .orderBy(asc(marketData.date));
  }

  async saveMarketData(data: InsertMarketData[]): Promise<void> {
    if (data.length === 0) return;
    // Batch insert for performance
    await db.insert(marketData).values(data).onConflictDoNothing();
  }

  async hasDataForSymbol(symbol: string): Promise<boolean> {
    const result = await db.select({ id: marketData.id })
      .from(marketData)
      .where(eq(marketData.symbol, symbol))
      .limit(1);
    return result.length > 0;
  }
}

export const storage = new DatabaseStorage();
