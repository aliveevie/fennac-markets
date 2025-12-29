import { useState, useEffect, useCallback } from "react";
import { useAccount, useWalletClient } from "wagmi";
import { ClobClient } from "@polymarket/clob-client";
import { initializeClobClient } from "@/lib/clob-client";
import { toast } from "@/hooks/use-toast";

export function useClobClient() {
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [clobClient, setClobClient] = useState<ClobClient | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initialize = useCallback(async () => {
    if (!isConnected || !walletClient || !address) {
      setClobClient(null);
      return;
    }

    setIsInitializing(true);
    setError(null);

    try {
      const client = await initializeClobClient(walletClient);
      setClobClient(client);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to initialize CLOB client";
      setError(errorMessage);
      toast({
        title: "CLOB Client Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsInitializing(false);
    }
  }, [isConnected, walletClient, address]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return {
    clobClient,
    isInitializing,
    error,
    isReady: !!clobClient && !isInitializing,
    reinitialize: initialize,
  };
}

