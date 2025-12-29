import { Link } from "react-router-dom";
import { TrendingUp, Users, Calendar, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MarketCardProps {
  id: string;
  title: string;
  category: string;
  yesPrice: number;
  noPrice: number;
  volume: string;
  liquidity: string;
  endDate: string;
  featured?: boolean;
}

export function MarketCard({
  id,
  title,
  category,
  yesPrice,
  noPrice,
  volume,
  liquidity,
  endDate,
  featured = false,
}: MarketCardProps) {
  const yesPercent = Math.round(yesPrice * 100);
  const noPercent = Math.round(noPrice * 100);

  return (
    <Link to={`/market/${id}`}>
      <article
        className={`group relative rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/30 hover:bg-surface-elevated ${
          featured ? "ring-1 ring-primary/20" : ""
        }`}
      >
        {/* Category Badge */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {category}
          </span>
          {featured && (
            <span className="text-xs font-semibold text-primary px-2 py-0.5 bg-primary/10 rounded-full">
              Featured
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-foreground mb-4 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Probability Bars */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-yes w-8">YES</span>
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-yes rounded-full transition-all duration-500"
                style={{ width: `${yesPercent}%` }}
              />
            </div>
            <span className="font-mono text-sm font-semibold text-yes w-12 text-right">
              {yesPercent}¢
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-no w-8">NO</span>
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-no rounded-full transition-all duration-500"
                style={{ width: `${noPercent}%` }}
              />
            </div>
            <span className="font-mono text-sm font-semibold text-no w-12 text-right">
              {noPercent}¢
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-3 border-t border-border">
          <div className="flex items-center gap-1">
            <TrendingUp className="h-3.5 w-3.5" />
            <span className="font-mono">{volume}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            <span className="font-mono">{liquidity}</span>
          </div>
          <div className="flex items-center gap-1 ml-auto">
            <Calendar className="h-3.5 w-3.5" />
            <span>{endDate}</span>
          </div>
        </div>

        {/* Hover Arrow */}
        <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </article>
    </Link>
  );
}

export function MarketCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="h-4 w-20 bg-muted rounded skeleton-pulse" />
      </div>
      <div className="h-5 w-full bg-muted rounded skeleton-pulse mb-2" />
      <div className="h-5 w-3/4 bg-muted rounded skeleton-pulse mb-4" />
      <div className="space-y-3 mb-4">
        <div className="h-2 w-full bg-muted rounded-full skeleton-pulse" />
        <div className="h-2 w-full bg-muted rounded-full skeleton-pulse" />
      </div>
      <div className="flex gap-4 pt-3 border-t border-border">
        <div className="h-4 w-16 bg-muted rounded skeleton-pulse" />
        <div className="h-4 w-16 bg-muted rounded skeleton-pulse" />
        <div className="h-4 w-20 bg-muted rounded skeleton-pulse ml-auto" />
      </div>
    </div>
  );
}
