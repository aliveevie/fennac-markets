import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Info, ArrowRight, Wallet } from "lucide-react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

interface TradingPanelProps {
  yesPrice: number;
  noPrice: number;
  onTrade?: (side: "yes" | "no", amount: number, action: "buy" | "sell") => void;
}

export function TradingPanel({ yesPrice, noPrice, onTrade }: TradingPanelProps) {
  const { isConnected } = useAccount();
  const [selectedSide, setSelectedSide] = useState<"yes" | "no">("yes");
  const [amount, setAmount] = useState("");
  const [action, setAction] = useState<"buy" | "sell">("buy");

  const price = selectedSide === "yes" ? yesPrice : noPrice;
  const shares = amount ? parseFloat(amount) / price : 0;
  const potentialReturn = shares * 1;
  const impliedProbability = Math.round(price * 100);

  const handleTrade = () => {
    if (amount && onTrade) {
      onTrade(selectedSide, parseFloat(amount), action);
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">Trade</h3>
      </div>

      <Tabs value={action} onValueChange={(v) => setAction(v as "buy" | "sell")} className="w-full">
        <TabsList className="w-full rounded-none border-b border-border bg-transparent h-11">
          <TabsTrigger
            value="buy"
            className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground"
          >
            Buy
          </TabsTrigger>
          <TabsTrigger
            value="sell"
            className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground"
          >
            Sell
          </TabsTrigger>
        </TabsList>

        <TabsContent value="buy" className="mt-0">
          <TradingForm
            selectedSide={selectedSide}
            setSelectedSide={setSelectedSide}
            amount={amount}
            setAmount={setAmount}
            yesPrice={yesPrice}
            noPrice={noPrice}
            shares={shares}
            potentialReturn={potentialReturn}
            impliedProbability={impliedProbability}
            action="buy"
            onSubmit={handleTrade}
            isConnected={isConnected}
          />
        </TabsContent>

        <TabsContent value="sell" className="mt-0">
          <TradingForm
            selectedSide={selectedSide}
            setSelectedSide={setSelectedSide}
            amount={amount}
            setAmount={setAmount}
            yesPrice={yesPrice}
            noPrice={noPrice}
            shares={shares}
            potentialReturn={potentialReturn}
            impliedProbability={impliedProbability}
            action="sell"
            onSubmit={handleTrade}
            isConnected={isConnected}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface TradingFormProps {
  selectedSide: "yes" | "no";
  setSelectedSide: (side: "yes" | "no") => void;
  amount: string;
  setAmount: (amount: string) => void;
  yesPrice: number;
  noPrice: number;
  shares: number;
  potentialReturn: number;
  impliedProbability: number;
  action: "buy" | "sell";
  onSubmit: () => void;
  isConnected: boolean;
}

function TradingForm({
  selectedSide,
  setSelectedSide,
  amount,
  setAmount,
  yesPrice,
  noPrice,
  shares,
  potentialReturn,
  impliedProbability,
  action,
  onSubmit,
  isConnected,
}: TradingFormProps) {
  return (
    <div className="p-4 space-y-4">
      {/* Side Selection */}
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant={selectedSide === "yes" ? "yes" : "yes-outline"}
          className="h-14 flex-col items-center gap-0.5"
          onClick={() => setSelectedSide("yes")}
        >
          <span className="text-lg font-bold">YES</span>
          <span className="text-xs opacity-80 font-mono">{Math.round(yesPrice * 100)}¢</span>
        </Button>
        <Button
          variant={selectedSide === "no" ? "no" : "no-outline"}
          className="h-14 flex-col items-center gap-0.5"
          onClick={() => setSelectedSide("no")}
        >
          <span className="text-lg font-bold">NO</span>
          <span className="text-xs opacity-80 font-mono">{Math.round(noPrice * 100)}¢</span>
        </Button>
      </div>

      {/* Amount Input */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground">
          Amount (USDC)
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            $
          </span>
          <Input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="pl-7 font-mono text-lg h-12 bg-muted border-border"
          />
        </div>
        <div className="flex gap-2">
          {["10", "25", "50", "100"].map((preset) => (
            <Button
              key={preset}
              variant="outline"
              size="sm"
              className="flex-1 font-mono text-xs"
              onClick={() => setAmount(preset)}
            >
              ${preset}
            </Button>
          ))}
        </div>
      </div>

      {/* Trade Summary */}
      <div className="rounded-lg bg-muted p-3 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shares</span>
          <span className="font-mono font-medium">{shares.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Avg. Price</span>
          <span className="font-mono font-medium">{impliedProbability}¢</span>
        </div>
        <div className="flex justify-between text-sm pt-2 border-t border-border">
          <span className="text-muted-foreground">Potential Return</span>
          <span className={`font-mono font-semibold ${selectedSide === "yes" ? "text-yes" : "text-no"}`}>
            ${potentialReturn.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="flex items-start gap-2 text-xs text-muted-foreground">
        <Info className="h-4 w-4 shrink-0 mt-0.5" />
        <span>
          {action === "buy" 
            ? "Shares pay $1 if the outcome is correct, $0 otherwise."
            : "Sell your existing shares at the current market price."}
        </span>
      </div>

      {/* Submit Button */}
      {isConnected ? (
        <Button
          variant={selectedSide === "yes" ? "yes" : "no"}
          className="w-full h-12"
          onClick={onSubmit}
          disabled={!amount || parseFloat(amount) <= 0}
        >
          {action === "buy" ? "Buy" : "Sell"} {selectedSide.toUpperCase()}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      ) : (
        <div className="flex justify-center">
          <ConnectButton />
        </div>
      )}
    </div>
  );
}
