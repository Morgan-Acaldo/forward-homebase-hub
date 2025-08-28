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
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <h1 className="text-xl font-bold text-foreground">Forward</h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>Secure & Encrypted</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-5"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
            Simplify Your Move with{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Forward
            </span>
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
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
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ServiceGrid isAddressLocked={isAddressLocked} />
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 border-t border-border bg-card/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-8">
            Trusted by thousands of movers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">256-bit</div>
              <div className="text-sm text-muted-foreground">SSL Encryption</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Supported Services</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 Forward. All rights reserved.</p>
            <p className="mt-2 text-sm">Making moves easier, one address at a time.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;