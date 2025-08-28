import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Lock, CheckCircle } from "lucide-react";

interface AddressInputProps {
  onAddressSubmit: (address: string) => void;
  isLocked: boolean;
}

export const AddressInput = ({ onAddressSubmit, isLocked }: AddressInputProps) => {
  const [address, setAddress] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.trim()) {
      onAddressSubmit(address);
      setIsSubmitted(true);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-card border-0 bg-card">
      <CardContent className="p-8">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            {isLocked ? (
              <div className="p-3 bg-success-light rounded-full">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
            ) : (
              <div className="p-3 bg-primary-light rounded-full">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
            )}
          </div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            {isLocked ? "Address Confirmed" : "Enter Your New Address"}
          </h2>
          <p className="text-muted-foreground">
            {isLocked 
              ? "Your address is locked and secure. Now let's update your services."
              : "We'll help you update your address across all your important services"
            }
          </p>
        </div>

        {isLocked ? (
          <div className="space-y-4">
            <div className="p-4 bg-success-light rounded-lg border border-success/20">
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-success" />
                <div>
                  <p className="font-medium text-success-foreground">{address}</p>
                  <p className="text-sm text-success/80">Address locked and verified</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm font-medium text-foreground">
                New Address
              </Label>
              <Input
                id="address"
                type="text"
                placeholder="Enter your complete new address..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="h-12 text-lg border-border focus:ring-primary focus:border-primary"
                disabled={isSubmitted}
              />
            </div>

            <Button 
              type="submit" 
              variant="primary"
              size="lg"
              className="w-full h-12"
              disabled={!address.trim() || isSubmitted}
            >
              {isSubmitted ? "Processing..." : "Lock in My Address"}
            </Button>

            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                🔒 Your information is encrypted and secure
              </p>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
};