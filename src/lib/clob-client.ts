import { ClobClient, ApiKeyCreds, OrderType, Side } from "@polymarket/clob-client";
import { Wallet } from "ethers";
import type { WalletClient } from "viem";

const host = import.meta.env.VITE_CLOB_HOST || "https://clob.polymarket.com";
const funder = import.meta.env.VITE_CLOB_FUNDER || "0x4f1e7caacc7ad103397c30bb6db2d85d75d22d30";
const signatureType = parseInt(import.meta.env.VITE_CLOB_SIGNATURE_TYPE || "2"); // 1: Magic/Email, 2: Browser Wallet, 0: EOA

/**
 * Initialize CLOB client with wagmi wallet client
 * For browser wallets (MetaMask), we use the private key from env
 */
export async function initializeClobClient(walletClient: WalletClient): Promise<ClobClient> {
  // Get the account address
  const [account] = await walletClient.getAddresses();
  if (!account) {
    throw new Error("No account found in wallet");
  }

  // Get private key from env
  const privateKey = import.meta.env.VITE_PRIVATE_KEY;
  
  if (!privateKey) {
    throw new Error("VITE_PRIVATE_KEY is required in .env file");
  }

  // Create ethers wallet from private key
  const wallet = new Wallet(privateKey);
  
  // Verify the wallet address matches the connected address (warning only)
  if (wallet.address.toLowerCase() !== account.toLowerCase()) {
    console.warn("Warning: Private key address doesn't match connected wallet address");
  }

  // Create or derive API key
  const tempClient = new ClobClient(host, 137, wallet);
  const creds: ApiKeyCreds = await tempClient.createOrDeriveApiKey();

  // Create the actual client with credentials
  const clobClient = new ClobClient(host, 137, wallet, creds, signatureType, funder);

  return clobClient;
}

/**
 * Place an order using CLOB client
 */
export async function placeOrder(
  clobClient: ClobClient,
  params: {
    tokenID: string;
    price: number;
    side: "yes" | "no";
    size: number;
    tickSize: string;
    negRisk: boolean;
  }
) {
  const side = params.side === "yes" ? Side.BUY : Side.SELL;
  
  const order = await clobClient.createAndPostOrder(
    {
      tokenID: params.tokenID,
      price: params.price,
      side: side,
      size: params.size,
      feeRateBps: 0,
    },
    {
      tickSize: params.tickSize,
      negRisk: params.negRisk,
    },
    OrderType.GTC
  );
  
  return order;
}

/**
 * Get market information (tickSize, negRisk) for a token
 * This should be fetched from the Polymarket API
 */
export interface MarketInfo {
  tickSize: string;
  negRisk: boolean;
  tokenID: string;
}

/**
 * Fetch market info from Polymarket API
 * Uses the Polymarket Gamma Markets API to get market details
 * API docs: https://docs.polymarket.com/developers/gamma-markets-api/get-markets
 */
export async function getMarketInfo(marketId: string): Promise<MarketInfo | null> {
  try {
    // Use Polymarket's Gamma Markets API
    // You may need to adjust the endpoint based on the actual API structure
    const response = await fetch(`https://gamma-api.polymarket.com/markets/${marketId}`);
    
    if (!response.ok) {
      console.error(`Failed to fetch market info: ${response.statusText}`);
      return null;
    }
    
    const data = await response.json();
    
    // Extract market info from the response
    // Adjust these paths based on the actual API response structure
    const outcomeTokens = data.outcomeTokens || [];
    const yesToken = outcomeTokens.find((token: any) => token.outcome === "Yes");
    const noToken = outcomeTokens.find((token: any) => token.outcome === "No");
    
    return {
      tickSize: data.tickSize || data.minPriceIncrement || "0.001",
      negRisk: data.negRisk || false,
      tokenID: yesToken?.tokenId || "", // Return YES token ID as default
    };
  } catch (error) {
    console.error("Error fetching market info:", error);
    return null;
  }
}

/**
 * Get both YES and NO token IDs for a market
 */
export async function getMarketTokens(marketId: string): Promise<{ yesTokenID: string; noTokenID: string } | null> {
  try {
    const response = await fetch(`https://gamma-api.polymarket.com/markets/${marketId}`);
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    const outcomeTokens = data.outcomeTokens || [];
    
    const yesToken = outcomeTokens.find((token: any) => token.outcome === "Yes");
    const noToken = outcomeTokens.find((token: any) => token.outcome === "No");
    
    return {
      yesTokenID: yesToken?.tokenId || "",
      noTokenID: noToken?.tokenId || "",
    };
  } catch (error) {
    console.error("Error fetching market tokens:", error);
    return null;
  }
}

