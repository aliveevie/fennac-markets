import { Wallet, TrendingUp, TrendingDown, Clock, CheckCircle2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PositionCard } from "@/components/portfolio/PositionCard";
import { mockPositions, resolvedPositions } from "@/data/mockData";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Portfolio() {
  const { isConnected, address } = useAccount();

  const totalBalance = 1250.45;
  const totalPnl = 186.32;
  const pnlPercent = 17.5;

  if (!isConnected) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="container max-w-md text-center py-16">
          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Wallet className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Connect Your Wallet</h1>
            <p className="text-muted-foreground mb-6">
              Connect your wallet to view your portfolio, track positions, and start trading on prediction markets.
            </p>
            
            <div className="flex justify-center">
              <ConnectButton />
            </div>

            <div className="mt-8 pt-6 border-t border-border text-left">
              <h3 className="text-sm font-semibold text-foreground mb-3">Supported Wallets</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  MetaMask, Coinbase Wallet, WalletConnect
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Rainbow, Trust Wallet, Ledger
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  200+ wallets via WalletConnect
                </li>
              </ul>
            </div>

            <div className="mt-6 p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground">
              <p className="font-medium text-foreground mb-1">Non-Custodial</p>
              <p>
                Fennac never has access to your private keys. You maintain full control of your assets at all times.
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Portfolio Header */}
      <section className="border-b border-border">
        <div className="container py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-foreground">Portfolio</h1>
            <span className="text-sm text-muted-foreground font-mono">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </span>
          </div>

          {/* Balance Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-5">
              <span className="text-sm text-muted-foreground">Total Balance</span>
              <p className="text-3xl font-bold font-mono text-foreground mt-1">
                ${totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <span className="text-sm text-muted-foreground">Unrealized P&L</span>
              <div className="flex items-center gap-2 mt-1">
                <p className={`text-3xl font-bold font-mono ${totalPnl >= 0 ? "text-yes" : "text-no"}`}>
                  {totalPnl >= 0 ? "+" : ""}${totalPnl.toFixed(2)}
                </p>
                <span className={`flex items-center gap-0.5 text-sm font-mono ${totalPnl >= 0 ? "text-yes" : "text-no"}`}>
                  {totalPnl >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  {pnlPercent.toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <span className="text-sm text-muted-foreground">Open Positions</span>
              <p className="text-3xl font-bold font-mono text-foreground mt-1">
                {mockPositions.length}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Positions */}
      <section className="container py-8">
        <Tabs defaultValue="open">
          <TabsList className="mb-6">
            <TabsTrigger value="open" className="gap-2">
              <Clock className="h-4 w-4" />
              Open Positions
              <span className="ml-1 text-xs font-mono bg-muted px-1.5 py-0.5 rounded">
                {mockPositions.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="resolved" className="gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Resolved
              <span className="ml-1 text-xs font-mono bg-muted px-1.5 py-0.5 rounded">
                {resolvedPositions.length}
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="open">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mockPositions.map((position) => (
                <PositionCard key={position.id} {...position} />
              ))}
            </div>
            {mockPositions.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No open positions. Start trading to see your positions here.
              </div>
            )}
          </TabsContent>

          <TabsContent value="resolved">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {resolvedPositions.map((position) => (
                <PositionCard key={position.id} {...position} />
              ))}
            </div>
            {resolvedPositions.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No resolved positions yet.
              </div>
            )}
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
