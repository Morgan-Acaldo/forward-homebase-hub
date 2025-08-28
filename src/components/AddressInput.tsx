import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Lock, CheckCircle } from "lucide-react";

interface AddressData {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

interface AddressInputProps {
  onAddressSubmit: (address: string) => void;
  isLocked: boolean;
}

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

export const AddressInput = ({ onAddressSubmit, isLocked }: AddressInputProps) => {
  const [addressData, setAddressData] = useState<AddressData>({
    street: "",
    city: "",
    state: "",
    zipCode: ""
  });
  const [fullAddress, setFullAddress] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateAddressField = (field: keyof AddressData, value: string) => {
    const newAddressData = { ...addressData, [field]: value };
    setAddressData(newAddressData);
    
    // Update full address string
    const { street, city, state, zipCode } = newAddressData;
    if (street && city && state && zipCode) {
      setFullAddress(`${street}, ${city}, ${state} ${zipCode}`);
    }
  };

  const isFormValid = () => {
    return addressData.street.trim() && 
           addressData.city.trim() && 
           addressData.state && 
           addressData.zipCode.trim();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      onAddressSubmit(fullAddress);
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
                  <p className="font-medium text-success-foreground">{fullAddress}</p>
                  <p className="text-sm text-success/80">Address locked and verified</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {/* Street Address */}
              <div className="space-y-2">
                <Label htmlFor="street" className="text-sm font-medium text-foreground">
                  Street Address
                </Label>
                <Input
                  id="street"
                  type="text"
                  placeholder="123 Main Street, Apt 4B"
                  value={addressData.street}
                  onChange={(e) => updateAddressField('street', e.target.value)}
                  className="h-12 text-lg border-border focus:ring-primary focus:border-primary"
                  disabled={isSubmitted}
                />
              </div>

              {/* City and State Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-sm font-medium text-foreground">
                    City
                  </Label>
                  <Input
                    id="city"
                    type="text"
                    placeholder="San Francisco"
                    value={addressData.city}
                    onChange={(e) => updateAddressField('city', e.target.value)}
                    className="h-12 text-lg border-border focus:ring-primary focus:border-primary"
                    disabled={isSubmitted}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state" className="text-sm font-medium text-foreground">
                    State
                  </Label>
                  <Select
                    value={addressData.state}
                    onValueChange={(value) => updateAddressField('state', value)}
                    disabled={isSubmitted}
                  >
                    <SelectTrigger className="h-12 text-lg border-border focus:ring-primary focus:border-primary">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {US_STATES.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* ZIP Code */}
              <div className="space-y-2">
                <Label htmlFor="zipCode" className="text-sm font-medium text-foreground">
                  ZIP Code
                </Label>
                <Input
                  id="zipCode"
                  type="text"
                  placeholder="94105"
                  value={addressData.zipCode}
                  onChange={(e) => updateAddressField('zipCode', e.target.value)}
                  className="h-12 text-lg border-border focus:ring-primary focus:border-primary"
                  disabled={isSubmitted}
                  maxLength={5}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              variant="primary"
              size="lg"
              className="w-full h-12"
              disabled={!isFormValid() || isSubmitted}
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