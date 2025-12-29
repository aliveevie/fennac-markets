import { MarketCard, MarketCardSkeleton } from "@/components/markets/MarketCard";
import { featuredMarkets, marketCategories } from "@/data/mockData";
import { useState } from "react";
import { Search, Filter, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Markets() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const filteredMarkets = featuredMarkets.filter((market) => {
    const matchesCategory =
      activeCategory === "all" ||
      market.category.toLowerCase().includes(activeCategory.toLowerCase());
    const matchesSearch =
      market.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      market.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative border-b border-border">
        <div className="absolute inset-0 gradient-hero" />
        <div className="container relative py-12 md:py-16">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Geopolitical Prediction Markets
            </h1>
            <p className="text-muted-foreground text-lg">
              Trade on elections, policy, sanctions, and global events. Non-custodial. Powered by Polygon.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-border">
            <div>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Total Volume</span>
              <p className="text-2xl font-bold font-mono text-foreground">$24.8M</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Active Markets</span>
              <p className="text-2xl font-bold font-mono text-foreground">156</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Traders</span>
              <p className="text-2xl font-bold font-mono text-foreground">12.4K</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="border-b border-border sticky top-16 z-40 bg-background/95 backdrop-blur-sm">
        <div className="container py-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Category Pills */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              {marketCategories.slice(0, 5).map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  size="sm"
                  className="whitespace-nowrap"
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                  <span className="ml-1.5 text-xs opacity-70 font-mono">
                    {category.count}
                  </span>
                </Button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search markets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-muted border-border"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Markets Grid */}
      <section className="container py-8">
        {/* Featured Section */}
        {activeCategory === "all" && !searchQuery && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Featured Markets</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {isLoading
                ? [1, 2].map((i) => <MarketCardSkeleton key={i} />)
                : filteredMarkets
                    .filter((m) => m.featured)
                    .map((market) => (
                      <MarketCard key={market.id} {...market} />
                    ))}
            </div>
          </div>
        )}

        {/* All Markets */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">
            {activeCategory === "all" ? "All Markets" : marketCategories.find(c => c.id === activeCategory)?.name || "Markets"}
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {isLoading
              ? [1, 2, 3, 4, 5, 6].map((i) => <MarketCardSkeleton key={i} />)
              : filteredMarkets.map((market) => (
                  <MarketCard key={market.id} {...market} />
                ))}
          </div>

          {filteredMarkets.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No markets found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
