import { Book, Shield, Wallet, HelpCircle, ExternalLink, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const docSections = [
  {
    icon: Book,
    title: "Getting Started",
    description: "Learn how to connect your wallet and make your first trade on Fennac.",
    links: [
      "What are prediction markets?",
      "Connecting your wallet",
      "Making your first trade",
      "Understanding odds and probabilities",
    ],
  },
  {
    icon: Wallet,
    title: "Trading",
    description: "Understand how trading works, order types, and best practices.",
    links: [
      "Buying and selling shares",
      "Understanding liquidity",
      "Order execution",
      "Fees and costs",
    ],
  },
  {
    icon: Shield,
    title: "Security",
    description: "Learn about our non-custodial architecture and how your funds are protected.",
    links: [
      "Non-custodial trading explained",
      "Smart contract security",
      "Wallet best practices",
      "Risk management",
    ],
  },
  {
    icon: HelpCircle,
    title: "FAQ",
    description: "Frequently asked questions about Fennac and prediction markets.",
    links: [
      "How do markets resolve?",
      "What happens if I'm right?",
      "Withdrawal process",
      "Supported networks",
    ],
  },
];

export default function Docs() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="border-b border-border">
        <div className="container py-12 md:py-16">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Documentation
            </h1>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about trading geopolitical prediction markets on Fennac.
            </p>
          </div>
        </div>
      </section>

      {/* Doc Sections */}
      <section className="container py-8">
        <div className="grid gap-6 md:grid-cols-2">
          {docSections.map((section) => (
            <div
              key={section.title}
              className="rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:bg-surface-elevated"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <section.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{section.description}</p>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors group"
                    >
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Risk Disclaimer */}
      <section className="container pb-12">
        <div className="rounded-xl border border-warning/30 bg-warning/5 p-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">Risk Disclaimer</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Prediction markets involve substantial risk of loss. The value of shares can fluctuate significantly, 
            and you may lose some or all of your investment. Past performance is not indicative of future results. 
            Fennac is a non-custodial interface and does not provide financial advice.
          </p>
          <p className="text-sm text-muted-foreground">
            Before trading, ensure you understand the risks involved and only trade with funds you can afford to lose. 
            Prediction markets may be subject to regulatory restrictions in your jurisdiction.
          </p>
        </div>
      </section>

      {/* External Links */}
      <section className="container pb-12">
        <h2 className="text-lg font-semibold text-foreground mb-4">External Resources</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" asChild>
            <a href="https://polygon.technology" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              Polygon Network
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="https://polymarket.com" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              Polymarket
            </a>
          </Button>
        </div>
      </section>
    </main>
  );
}
