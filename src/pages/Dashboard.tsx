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
      <header className="border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">F</span>
                </div>
                <h1 className="text-xl font-bold text-foreground">Forward</h1>
              </div>
              <nav className="hidden md:flex items-center gap-6">
                <a href="#" className="text-sm font-medium text-foreground border-b-2 border-primary pb-1">Dashboard</a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Services</a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Documents</a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Support</a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium">M</span>
                </div>
                <span className="text-sm text-muted-foreground">morgan.acaido@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Address Management Center</h1>
          <p className="text-muted-foreground">Securely update your address across all your services</p>
        </div>

        {/* Address Form */}
        <div className="mb-12">
          <AddressInput 
            onAddressSubmit={handleAddressSubmit}
            isLocked={isAddressLocked}
          />
        </div>

        {/* Services Section */}
        <ServiceGrid isAddressLocked={isAddressLocked} />
      </main>
    </div>
  );
};

export default Dashboard;