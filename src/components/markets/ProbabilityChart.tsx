import { Line, LineChart, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, AreaChart } from "recharts";

interface ProbabilityChartProps {
  data: Array<{
    date: string;
    probability: number;
  }>;
  color?: "yes" | "no" | "primary";
}

export function ProbabilityChart({ data, color = "primary" }: ProbabilityChartProps) {
  const colorMap = {
    yes: "hsl(160, 70%, 45%)",
    no: "hsl(0, 70%, 55%)",
    primary: "hsl(175, 65%, 42%)",
  };

  const strokeColor = colorMap[color];

  return (
    <div className="w-full h-64 rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">Probability History</h3>
        <div className="flex gap-2">
          {["1D", "1W", "1M", "ALL"].map((period) => (
            <button
              key={period}
              className="text-xs px-2 py-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {period}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={strokeColor} stopOpacity={0.3} />
              <stop offset="100%" stopColor={strokeColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }}
            tickMargin={10}
          />
          <YAxis
            domain={[0, 100]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }}
            tickFormatter={(value) => `${value}%`}
            width={40}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(220, 20%, 10%)",
              border: "1px solid hsl(220, 15%, 18%)",
              borderRadius: "8px",
              fontSize: "12px",
            }}
            labelStyle={{ color: "hsl(210, 20%, 94%)" }}
            formatter={(value: number) => [`${value}%`, "Probability"]}
          />
          <Area
            type="monotone"
            dataKey="probability"
            stroke={strokeColor}
            strokeWidth={2}
            fill="url(#chartGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ProbabilityChartSkeleton() {
  return (
    <div className="w-full h-64 rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="h-4 w-32 bg-muted rounded skeleton-pulse" />
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-6 w-8 bg-muted rounded skeleton-pulse" />
          ))}
        </div>
      </div>
      <div className="h-48 bg-muted/50 rounded-lg skeleton-pulse" />
    </div>
  );
}
