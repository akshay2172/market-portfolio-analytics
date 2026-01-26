import { useState } from "react";
import { Layout } from "@/components/Layout";
import { useMarketHistory } from "@/hooks/use-portfolio";
import { Search, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

const TICKERS = ["AAPL", "MSFT", "GOOGL", "AMZN", "META"];

export default function MarketData() {
  const [selectedSymbol, setSelectedSymbol] = useState("AAPL");
  const { data: history, isLoading } = useMarketHistory(selectedSymbol);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-popover border border-border rounded-lg shadow-xl p-3 text-sm">
          <p className="font-bold text-white mb-2">{new Date(label).toLocaleDateString()}</p>
          <div className="space-y-1">
            <p className="text-emerald-400">High: {formatCurrency(data.high)}</p>
            <p className="text-rose-400">Low: {formatCurrency(data.low)}</p>
            <p className="text-white">Open: {formatCurrency(data.open)}</p>
            <p className="text-white">Close: {formatCurrency(data.close)}</p>
            <p className="text-muted-foreground text-xs mt-1">Vol: {data.volume.toLocaleString()}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Layout>
      <div className="space-y-6 pb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-white">Market Data</h1>
            <p className="text-muted-foreground">Deep dive into historical price action and volume.</p>
          </div>
          
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <select
              value={selectedSymbol}
              onChange={(e) => setSelectedSymbol(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-card/50 border border-border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none cursor-pointer"
            >
              {TICKERS.map(t => (
                <option key={t} value={t}>{t} - {t === 'AAPL' ? 'Apple Inc.' : t === 'MSFT' ? 'Microsoft' : 'Tech Corp'}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Chart Card */}
        <motion.div
          key={selectedSymbol}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="glass-panel p-6 rounded-2xl h-[500px]"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">{selectedSymbol}</h2>
              <p className="text-sm text-muted-foreground">Historical OHLC & Volume</p>
            </div>
            {history && history.length > 0 && (
              <div className="text-right">
                <p className="text-2xl font-mono font-bold text-white">
                  ${history[history.length - 1].close.toFixed(2)}
                </p>
                <span className={`text-sm font-medium ${history[history.length - 1].close > history[history.length - 2].close ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {((history[history.length - 1].close - history[history.length - 2].close) / history[history.length - 2].close * 100).toFixed(2)}%
                </span>
              </div>
            )}
          </div>

          {isLoading ? (
            <div className="h-full w-full flex items-center justify-center">
              <div className="animate-pulse text-primary">Loading data...</div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="80%">
             <ComposedChart data={history ?? []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="#64748b" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(val) => new Date(val).toLocaleDateString(undefined, { month: 'short' })}
                  minTickGap={30}
                />
                <YAxis 
                  yAxisId="price"
                  stroke="#64748b" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  domain={['auto', 'auto']}
                  tickFormatter={(val) => `$${val}`}
                />
                <YAxis 
                  yAxisId="volume" 
                  orientation="right" 
                  stroke="#64748b" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(val) => `${(val/1000000).toFixed(0)}M`}
                />
                <Tooltip content={<CustomTooltip />} />
                
                {/* Volume Bars */}
                <Bar yAxisId="volume" dataKey="volume" fill="#ffffff10" barSize={5} />
                
                {/* Price Line (Close) */}
                <Line 
                  yAxisId="price" 
                  type="monotone" 
                  dataKey="close" 
                  stroke="#3b82f6" 
                  strokeWidth={2} 
                  dot={false}
                />
                
                {/* Simulated Candle Wicks (Low/High) - using error bars concept or composed lines */}
                {/* For simplicity in this composed chart, we focus on Close line + Volume, but could do custom shape for candles */}
              </ComposedChart>
            </ResponsiveContainer>
          )}
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Market Cap", value: "2.8T" },
            { label: "P/E Ratio", value: "32.4" },
            { label: "Div Yield", value: "0.54%" },
            { label: "52W High", value: "$214.30" }
          ].map((stat) => (
            <div key={stat.label} className="glass-panel p-4 rounded-xl text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
              <p className="text-lg font-bold text-white mt-1">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
