import { useState } from "react";
import { AddressInput } from "@/components/AddressInput";
import { ServiceGrid } from "@/components/ServiceGrid";
import heroImage from "@/assets/forward-hero.jpg";

const Dashboard = () => {
  const [currentAddress, setCurrentAddress] = useState("");
  const [isAddressLocked, setIsAddressLocked] = useState(false);

  const handleAddressSubmit = (address: string) => {
    setCurrentAddress(address);
    // Simulate API call delay
    setTimeout(() => {
      setIsAddressLocked(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-primary rounded flex items-center justify-center">
                <span className="text-primary-foreground font-semibold text-sm">F</span>
              </div>
              <h1 className="text-lg font-semibold text-foreground">Forward</h1>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
              <span>Secure & Encrypted</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Simplify Your Move with Forward
          </h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Update your address across all your important services in one place. 
            Secure, fast, and hassle-free address management when you move.
          </p>
          
          <AddressInput 
            onAddressSubmit={handleAddressSubmit}
            isLocked={isAddressLocked}
          />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ServiceGrid isAddressLocked={isAddressLocked} />
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 border-t border-border bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Trusted by thousands of movers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-semibold text-foreground mb-1">256-bit</div>
              <div className="text-xs text-muted-foreground">SSL Encryption</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-foreground mb-1">50+</div>
              <div className="text-xs text-muted-foreground">Supported Services</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-foreground mb-1">99.9%</div>
              <div className="text-xs text-muted-foreground">Uptime</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-foreground mb-1">24/7</div>
              <div className="text-xs text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-muted-foreground">
            <p className="text-sm">&copy; 2024 Forward. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;