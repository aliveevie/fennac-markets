import { TrendingUp, TrendingDown, Clock, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

interface PositionCardProps {
  id: string;
  marketTitle: string;
  side: "yes" | "no";
  shares: number;
  avgPrice: number;
  currentPrice: number;
  status: "open" | "resolved";
  resolvedOutcome?: "yes" | "no";
}

export function PositionCard({
  id,
  marketTitle,
  side,
  shares,
  avgPrice,
  currentPrice,
  status,
  resolvedOutcome,
}: PositionCardProps) {
  const costBasis = shares * avgPrice;
  const currentValue = status === "resolved" 
    ? (resolvedOutcome === side ? shares : 0)
    : shares * currentPrice;
  const pnl = currentValue - costBasis;
  const pnlPercent = costBasis > 0 ? (pnl / costBasis) * 100 : 0;
  const isProfit = pnl >= 0;

  return (
    <Link to={`/market/${id}`}>
      <div className="group rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:border-primary/30 hover:bg-surface-elevated">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`text-xs font-bold uppercase px-2 py-0.5 rounded ${
                  side === "yes"
                    ? "bg-yes/20 text-yes"
                    : "bg-no/20 text-no"
                }`}
              >
                {side}
              </span>
              {status === "resolved" ? (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <CheckCircle2 className="h-3 w-3" />
                  Resolved
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  Open
                </span>
              )}
            </div>
            <h4 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
              {marketTitle}
            </h4>
          </div>
          <div className={`flex items-center gap-1 ${isProfit ? "text-yes" : "text-no"}`}>
            {isProfit ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span className="font-mono text-sm font-semibold">
              {isProfit ? "+" : ""}{pnlPercent.toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div>
            <span className="text-xs text-muted-foreground block">Shares</span>
            <span className="font-mono font-medium">{shares.toFixed(2)}</span>
          </div>
          <div>
            <span className="text-xs text-muted-foreground block">Avg. Price</span>
            <span className="font-mono font-medium">{Math.round(avgPrice * 100)}¢</span>
          </div>
          <div>
            <span className="text-xs text-muted-foreground block">Current</span>
            <span className="font-mono font-medium">
              {status === "resolved" 
                ? (resolvedOutcome === side ? "100¢" : "0¢")
                : `${Math.round(currentPrice * 100)}¢`}
            </span>
          </div>
        </div>

        {/* PnL Row */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          <span className="text-xs text-muted-foreground">P&L</span>
          <span className={`font-mono font-semibold ${isProfit ? "text-yes" : "text-no"}`}>
            {isProfit ? "+" : ""}${pnl.toFixed(2)}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function PositionCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-5 w-10 bg-muted rounded skeleton-pulse" />
            <div className="h-4 w-12 bg-muted rounded skeleton-pulse" />
          </div>
          <div className="h-4 w-full bg-muted rounded skeleton-pulse" />
        </div>
        <div className="h-5 w-14 bg-muted rounded skeleton-pulse" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i}>
            <div className="h-3 w-12 bg-muted rounded skeleton-pulse mb-1" />
            <div className="h-4 w-10 bg-muted rounded skeleton-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
