import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { MapPin, Lock, CheckCircle, CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddressData {
  street: string;
  apartment: string;
  city: string;
  state: string;
  zipCode: string;
  moveDate: Date | undefined;
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
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    moveDate: undefined
  });
  const [fullAddress, setFullAddress] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateAddressField = (field: keyof AddressData, value: string | Date | undefined) => {
    const newAddressData = { ...addressData, [field]: value };
    setAddressData(newAddressData);
    
    // Update full address string
    const { street, apartment, city, state, zipCode } = newAddressData;
    if (street && city && state && zipCode) {
      const apt = apartment ? `, ${apartment}` : '';
      setFullAddress(`${street}${apt}, ${city}, ${state} ${zipCode}`);
    }
  };

  const isFormValid = () => {
    return addressData.street.trim() && 
           addressData.city.trim() && 
           addressData.state && 
           addressData.zipCode.trim() &&
           addressData.moveDate;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      onAddressSubmit(fullAddress);
      setIsSubmitted(true);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-sm border bg-card">
      <CardContent className="p-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            {isLocked ? (
              <div className="p-2 bg-success-light rounded-full">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
            ) : (
              <div className="p-2 bg-primary-light rounded-full">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
            )}
            <h2 className="text-xl font-semibold text-foreground">
              {isLocked ? "Address Confirmed" : "New Address Information"}
            </h2>
          </div>
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
            <div className="space-y-6">
              {/* Street Address */}
              <div className="space-y-2">
                <Label htmlFor="street" className="text-sm font-medium text-foreground">
                  Street Address
                </Label>
                <Input
                  id="street"
                  type="text"
                  placeholder="123 Main Street"
                  value={addressData.street}
                  onChange={(e) => updateAddressField('street', e.target.value)}
                  className="h-11 border-border"
                  disabled={isSubmitted}
                />
              </div>

              {/* Apartment/Suite and City Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="apartment" className="text-sm font-medium text-foreground">
                    Apartment / Suite (Optional)
                  </Label>
                  <Input
                    id="apartment"
                    type="text"
                    placeholder="Apt 4B"
                    value={addressData.apartment}
                    onChange={(e) => updateAddressField('apartment', e.target.value)}
                    className="h-11 border-border"
                    disabled={isSubmitted}
                  />
                </div>

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
                    className="h-11 border-border"
                    disabled={isSubmitted}
                  />
                </div>

              </div>

              {/* State and ZIP Code Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="state" className="text-sm font-medium text-foreground">
                    State
                  </Label>
                  <Select
                    value={addressData.state}
                    onValueChange={(value) => updateAddressField('state', value)}
                    disabled={isSubmitted}
                  >
                    <SelectTrigger className="h-11 border-border">
                      <SelectValue placeholder="CA" />
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
                    className="h-11 border-border"
                    disabled={isSubmitted}
                    maxLength={5}
                  />
                </div>
              </div>

              {/* Move Date */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Move Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "h-11 w-full justify-start text-left font-normal border-border",
                        !addressData.moveDate && "text-muted-foreground"
                      )}
                      disabled={isSubmitted}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {addressData.moveDate ? format(addressData.moveDate, "PPP") : <span>mm/dd/yyyy</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={addressData.moveDate}
                      onSelect={(date) => updateAddressField('moveDate', date)}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <Button 
              type="submit" 
              variant="default"
              className="w-auto px-8 h-11"
              disabled={!isFormValid() || isSubmitted}
            >
              {isSubmitted ? "Processing..." : "Confirm Address"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};