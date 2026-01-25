import { usePortfolioAnalytics } from "@/hooks/use-portfolio";
import { MetricCard } from "@/components/MetricCard";
import { Layout } from "@/components/Layout";
import { DollarSign, Activity, Wallet, ArrowUpRight, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const CHART_COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'];

export default function Dashboard() {
  const { data, isLoading, error } = usePortfolioAnalytics();

  if (error) {
    return (
      <Layout>
        <div className="space-y-8">
          <Alert variant="destructive">
            <AlertTitle>Error Loading Portfolio Data</AlertTitle>
            <AlertDescription>
              There was an error fetching your portfolio analytics. Please try again later.
            </AlertDescription>
          </Alert>
        </div>
      </Layout>
    );
  }

  if (isLoading || !data) {
    return (
      <Layout>
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="h-40 rounded-2xl bg-card/50" />
            <Skeleton className="h-40 rounded-2xl bg-card/50" />
            <Skeleton className="h-40 rounded-2xl bg-card/50" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Skeleton className="h-[400px] lg:col-span-2 rounded-2xl bg-card/50" />
            <Skeleton className="h-[400px] rounded-2xl bg-card/50" />
          </div>
        </div>
      </Layout>
    );
  }

  const { summary, history, assets } = data;

  return (
    <Layout>
      <div className="space-y-8 pb-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">Portfolio Overview</h1>
            <p className="text-muted-foreground">Welcome back, here's how your investments are performing today.</p>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-sm text-muted-foreground">Last updated</p>
            <p className="font-mono text-xs text-primary">Just now</p>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Total Balance"
            value={`$${summary.totalValue.toLocaleString()}`}
            change={summary.dayChangePercent}
            changeLabel="today"
            icon={<Wallet className="w-5 h-5" />}
            delay={0}
          />
          <MetricCard
            title="Total Return"
            value={`$${summary.totalReturn.toLocaleString()}`}
            change={summary.totalReturnPercent}
            changeLabel="all time"
            icon={<TrendingUp className="w-5 h-5" />}
            delay={0.1}
          />
          <MetricCard
            title="Day Change"
            value={`$${summary.dayChange.toLocaleString()}`}
            change={summary.dayChangePercent}
            changeLabel="vs yesterday"
            icon={<Activity className="w-5 h-5" />}
            delay={0.2}
          />
        </div>

        {/* Main Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-panel lg:col-span-2 p-6 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-white">Portfolio Performance</h3>
              <div className="flex gap-2">
                {['1D', '1W', '1M', '1Y', 'ALL'].map((period) => (
                  <button 
                    key={period}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${period === 'ALL' ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:bg-white/5'}`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={history}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    stroke="#64748b" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  />
                  <YAxis 
                    stroke="#64748b" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `$${value/1000}k`}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
                    labelFormatter={(label) => new Date(label).toLocaleDateString()}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-panel p-6 rounded-2xl"
          >
            <h3 className="text-lg font-bold text-white mb-6">Asset Allocation</h3>
            <div className="h-[250px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={assets}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="allocation"
                  >
                    {assets.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} stroke="rgba(0,0,0,0)" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                    formatter={(value: number) => [`${value}%`, 'Allocation']}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-xl font-bold text-white">{assets.length} Assets</p>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              {assets.map((asset, index) => (
                <div key={asset.symbol} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }} />
                    <span className="text-muted-foreground">{asset.symbol}</span>
                  </div>
                  <span className="font-medium text-white">{asset.allocation}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Asset List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">Your Assets</h3>
            <button className="text-sm text-primary hover:text-primary/80 transition-colors">View All</button>
          </div>

          <div className="glass-panel rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border/50 text-xs text-muted-foreground uppercase tracking-wider">
                    <th className="p-4 font-medium">Asset</th>
                    <th className="p-4 font-medium">Price</th>
                    <th className="p-4 font-medium">Balance</th>
                    <th className="p-4 font-medium">24h Change</th>
                    <th className="p-4 font-medium text-right">Trend (7d)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {assets.map((asset) => (
                    <tr key={asset.symbol} className="group hover:bg-white/5 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs">
                            {asset.symbol[0]}
                          </div>
                          <div>
                            <p className="font-bold text-white">{asset.symbol}</p>
                            <p className="text-xs text-muted-foreground">Technology</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-medium text-white">
                        ${asset.currentPrice.toFixed(2)}
                      </td>
                      <td className="p-4">
                        <p className="font-medium text-white">${asset.contribution.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">{asset.allocation}% of portfolio</p>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${asset.return >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                          {asset.return >= 0 ? '+' : ''}{asset.return}%
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="h-8 w-24 ml-auto">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={[
                              { v: 100 }, 
                              { v: 100 + (Math.random() * 20 - 10) }, 
                              { v: 100 + (Math.random() * 20 - 10) },
                              { v: 100 + (Math.random() * 20 - 10) },
                              { v: asset.return >= 0 ? 120 : 80 }
                            ]}>
                              <Line 
                                type="monotone" 
                                dataKey="v" 
                                stroke={asset.return >= 0 ? '#10b981' : '#f43f5e'} 
                                strokeWidth={2} 
                                dot={false} 
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
