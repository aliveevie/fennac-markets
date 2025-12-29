import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wallet, Menu, X } from "lucide-react";
import { useState } from "react";
import fennacLogo from "@/assets/fennac-logo.png";

const navLinks = [
  { href: "/", label: "Markets" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/docs", label: "Docs" },
];

export function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <nav className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img 
            src={fennacLogo} 
            alt="Fennac" 
            className="h-9 w-9 rounded-lg object-cover"
          />
          <span className="text-xl font-bold text-foreground tracking-tight">
            Fennac
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.href} to={link.href}>
              <Button
                variant="nav"
                className={
                  location.pathname === link.href
                    ? "text-foreground bg-secondary"
                    : ""
                }
              >
                {link.label}
              </Button>
            </Link>
          ))}
        </div>

        {/* Wallet Connect */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="wallet" size="default">
            <Wallet className="h-4 w-4" />
            Connect Wallet
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background animate-fade-in">
          <div className="container py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button
                  variant="nav"
                  className={`w-full justify-start ${
                    location.pathname === link.href
                      ? "text-foreground bg-secondary"
                      : ""
                  }`}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
            <Button variant="wallet" className="w-full mt-4">
              <Wallet className="h-4 w-4" />
              Connect Wallet
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
