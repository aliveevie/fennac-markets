import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Clock, Users, TrendingUp, Info, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TradingPanel } from "@/components/markets/TradingPanel";
import { ProbabilityChart } from "@/components/markets/ProbabilityChart";
import { featuredMarkets, chartData } from "@/data/mockData";

export default function MarketDetail() {
  const { id } = useParams<{ id: string }>();
  const market = featuredMarkets.find((m) => m.id === id) || featuredMarkets[0];

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border">
        <div className="container py-6">
          <Link to="/">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Markets
            </Button>
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary px-2 py-0.5 bg-primary/10 rounded-full">
                  {market.category}
                </span>
                {market.featured && (
                  <span className="text-xs font-semibold text-warning px-2 py-0.5 bg-warning/10 rounded-full">
                    Featured
                  </span>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {market.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>Resolves {market.endDate}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="h-4 w-4" />
                  <span>{market.volume} Volume</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  <span>{market.liquidity} Liquidity</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                View on Polymarket
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Chart & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Prices */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-yes/30 bg-yes/5 p-4 glow-yes">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-yes">YES</span>
                  <span className="text-xs text-muted-foreground">Implied Probability</span>
                </div>
                <p className="text-4xl font-bold font-mono text-yes">
                  {Math.round(market.yesPrice * 100)}¢
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {Math.round(market.yesPrice * 100)}% chance
                </p>
              </div>
              <div className="rounded-xl border border-no/30 bg-no/5 p-4 glow-no">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-no">NO</span>
                  <span className="text-xs text-muted-foreground">Implied Probability</span>
                </div>
                <p className="text-4xl font-bold font-mono text-no">
                  {Math.round(market.noPrice * 100)}¢
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {Math.round(market.noPrice * 100)}% chance
                </p>
              </div>
            </div>

            {/* Chart */}
            <ProbabilityChart data={chartData} color="yes" />

            {/* Resolution Rules */}
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <Info className="h-5 w-5 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Resolution Rules</h3>
              </div>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  This market will resolve to <strong className="text-foreground">YES</strong> if the specified outcome occurs by the resolution date, 
                  as verified by official government sources and reputable news organizations.
                </p>
                <p>
                  This market will resolve to <strong className="text-foreground">NO</strong> if the specified outcome does not occur by the resolution date.
                </p>
                <p className="text-xs pt-2 border-t border-border">
                  Resolution source: Official government announcements, Reuters, AP News, Bloomberg
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Trading Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <TradingPanel yesPrice={market.yesPrice} noPrice={market.noPrice} />

              {/* Disclaimer */}
              <div className="mt-4 p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground">
                <p className="font-medium text-foreground mb-1">Non-custodial Trading</p>
                <p>
                  Your funds remain in your wallet until trade execution. Fennac never has custody of your assets.
                  Trading prediction markets involves risk of loss.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
