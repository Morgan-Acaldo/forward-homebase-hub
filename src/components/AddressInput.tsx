import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { MapPin, Lock, CheckCircle, CalendarIcon, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddressData {
  street: string;
  apartment: string;
  city: string;
  state: string;
  zipCode: string;
  moveDate: Date | undefined;
  addressType: 'residential' | 'mailing';
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
  const [oldAddress, setOldAddress] = useState<AddressData>({
    street: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    moveDate: undefined,
    addressType: 'residential'
  });
  const [newAddresses, setNewAddresses] = useState<AddressData[]>([{
    street: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    moveDate: undefined,
    addressType: 'residential'
  }]);
  const [fullAddress, setFullAddress] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateOldAddressField = (field: keyof AddressData, value: string | Date | undefined) => {
    setOldAddress(prev => ({ ...prev, [field]: value }));
  };

  const updateNewAddressField = (index: number, field: keyof AddressData, value: string | Date | undefined) => {
    setNewAddresses(prev => 
      prev.map((addr, i) => i === index ? { ...addr, [field]: value } : addr)
    );
    
    // Update full address string for the first new address
    if (index === 0) {
      const newAddressData = { ...newAddresses[0], [field]: value };
      const { street, apartment, city, state, zipCode } = newAddressData;
      if (street && city && state && zipCode) {
        const apt = apartment ? `, ${apartment}` : '';
        setFullAddress(`${street}${apt}, ${city}, ${state} ${zipCode}`);
      }
    }
  };

  const addNewAddress = () => {
    setNewAddresses(prev => [...prev, {
      street: "",
      apartment: "",
      city: "",
      state: "",
      zipCode: "",
      moveDate: undefined,
      addressType: 'residential'
    }]);
  };

  const removeAddress = (index: number) => {
    if (newAddresses.length > 1) {
      setNewAddresses(prev => prev.filter((_, i) => i !== index));
    }
  };

  const isFormValid = () => {
    const firstAddress = newAddresses[0];
    return firstAddress.street.trim() && 
           firstAddress.city.trim() && 
           firstAddress.state && 
           firstAddress.zipCode.trim() &&
           firstAddress.moveDate;
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
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Old Address Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground border-b border-border pb-2">
                Previous Address
              </h3>
              <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">Address Type</Label>
                    <Select
                      value={oldAddress.addressType}
                      onValueChange={(value: 'residential' | 'mailing') => updateOldAddressField('addressType', value)}
                      disabled={isSubmitted}
                    >
                      <SelectTrigger className="h-11 border-border">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">Residential</SelectItem>
                        <SelectItem value="mailing">Mailing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">Street Address</Label>
                  <Input
                    type="text"
                    placeholder="123 Old Street"
                    value={oldAddress.street}
                    onChange={(e) => updateOldAddressField('street', e.target.value)}
                    className="h-11 border-border"
                    disabled={isSubmitted}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">
                      Apartment / Suite (Optional)
                    </Label>
                    <Input
                      type="text"
                      placeholder="Apt 1A"
                      value={oldAddress.apartment}
                      onChange={(e) => updateOldAddressField('apartment', e.target.value)}
                      className="h-11 border-border"
                      disabled={isSubmitted}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">City</Label>
                    <Input
                      type="text"
                      placeholder="Previous City"
                      value={oldAddress.city}
                      onChange={(e) => updateOldAddressField('city', e.target.value)}
                      className="h-11 border-border"
                      disabled={isSubmitted}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">ZIP Code</Label>
                    <Input
                      type="text"
                      placeholder="12345"
                      value={oldAddress.zipCode}
                      onChange={(e) => updateOldAddressField('zipCode', e.target.value)}
                      className="h-11 border-border"
                      disabled={isSubmitted}
                      maxLength={5}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">State</Label>
                  <Select
                    value={oldAddress.state}
                    onValueChange={(value) => updateOldAddressField('state', value)}
                    disabled={isSubmitted}
                  >
                    <SelectTrigger className="h-11 border-border">
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
            </div>

            {/* New Address Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-foreground border-b border-border pb-2 flex-1">
                  New Address{newAddresses.length > 1 ? 'es' : ''}
                </h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addNewAddress}
                  className="ml-4"
                  disabled={isSubmitted}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Address
                </Button>
              </div>

              {newAddresses.map((address, index) => (
                <div key={index} className="space-y-4 p-4 bg-background border border-border rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      Address {index + 1}
                    </span>
                    {newAddresses.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAddress(index)}
                        className="text-destructive hover:text-destructive"
                        disabled={isSubmitted}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">Address Type</Label>
                      <Select
                        value={address.addressType}
                        onValueChange={(value: 'residential' | 'mailing') => updateNewAddressField(index, 'addressType', value)}
                        disabled={isSubmitted}
                      >
                        <SelectTrigger className="h-11 border-border">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="residential">Residential</SelectItem>
                          <SelectItem value="mailing">Mailing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">Street Address</Label>
                    <Input
                      type="text"
                      placeholder="123 Main Street"
                      value={address.street}
                      onChange={(e) => updateNewAddressField(index, 'street', e.target.value)}
                      className="h-11 border-border"
                      disabled={isSubmitted}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">
                        Apartment / Suite (Optional)
                      </Label>
                      <Input
                        type="text"
                        placeholder="Apt 4B"
                        value={address.apartment}
                        onChange={(e) => updateNewAddressField(index, 'apartment', e.target.value)}
                        className="h-11 border-border"
                        disabled={isSubmitted}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">City</Label>
                      <Input
                        type="text"
                        placeholder="San Francisco"
                        value={address.city}
                        onChange={(e) => updateNewAddressField(index, 'city', e.target.value)}
                        className="h-11 border-border"
                        disabled={isSubmitted}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">ZIP Code</Label>
                      <Input
                        type="text"
                        placeholder="94105"
                        value={address.zipCode}
                        onChange={(e) => updateNewAddressField(index, 'zipCode', e.target.value)}
                        className="h-11 border-border"
                        disabled={isSubmitted}
                        maxLength={5}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">State</Label>
                    <Select
                      value={address.state}
                      onValueChange={(value) => updateNewAddressField(index, 'state', value)}
                      disabled={isSubmitted}
                    >
                      <SelectTrigger className="h-11 border-border">
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

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">Move Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "h-11 w-full justify-start text-left font-normal border-border",
                            !address.moveDate && "text-muted-foreground"
                          )}
                          disabled={isSubmitted}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {address.moveDate ? format(address.moveDate, "PPP") : <span>mm/dd/yyyy</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={address.moveDate}
                          onSelect={(date) => updateNewAddressField(index, 'moveDate', date)}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              ))}
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