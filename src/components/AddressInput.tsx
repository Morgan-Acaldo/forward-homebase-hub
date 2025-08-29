import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { MapPin, Lock, CheckCircle, CalendarIcon, Plus, X, ChevronDown, ChevronUp, Check, Unlock } from "lucide-react";
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
  const [newAddress, setNewAddress] = useState<AddressData>({
    street: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    moveDate: undefined,
    addressType: 'residential'
  });
  const [additionalAddresses, setAdditionalAddresses] = useState<AddressData[]>([]);
  const [fullAddress, setFullAddress] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isNewAddressOpen, setIsNewAddressOpen] = useState(true);
  const [isPreviousAddressOpen, setIsPreviousAddressOpen] = useState(false);
  const [isAdditionalAddressOpen, setIsAdditionalAddressOpen] = useState(true);

  const updateOldAddressField = (field: keyof AddressData, value: string | Date | undefined) => {
    setOldAddress(prev => ({ ...prev, [field]: value }));
  };

  const updateNewAddressField = (field: keyof AddressData, value: string | Date | undefined) => {
    const updatedAddress = { ...newAddress, [field]: value };
    setNewAddress(updatedAddress);
    
    // Update full address string
    const { street, apartment, city, state, zipCode } = updatedAddress;
    if (street && city && state && zipCode) {
      const apt = apartment ? `, ${apartment}` : '';
      setFullAddress(`${street}${apt}, ${city}, ${state} ${zipCode}`);
    }
  };

  const updateAdditionalAddressField = (index: number, field: keyof AddressData, value: string | Date | undefined) => {
    setAdditionalAddresses(prev => 
      prev.map((addr, i) => i === index ? { ...addr, [field]: value } : addr)
    );
  };

  const addAdditionalAddress = () => {
    setAdditionalAddresses(prev => [...prev, {
      street: "",
      apartment: "",
      city: "",
      state: "",
      zipCode: "",
      moveDate: undefined,
      addressType: 'residential'
    }]);
  };

  const removeAdditionalAddress = (index: number) => {
    setAdditionalAddresses(prev => prev.filter((_, i) => i !== index));
  };

  const isFormValid = () => {
    return newAddress.street.trim() && 
           newAddress.city.trim() && 
           newAddress.state && 
           newAddress.zipCode.trim() &&
           newAddress.moveDate;
  };

  const isNewAddressComplete = () => {
    return newAddress.street.trim() && 
           newAddress.city.trim() && 
           newAddress.state && 
           newAddress.zipCode.trim() &&
           newAddress.moveDate;
  };

  const isPreviousAddressComplete = () => {
    return oldAddress.street.trim() && 
           oldAddress.city.trim() && 
           oldAddress.state && 
           oldAddress.zipCode.trim();
  };

  const isAdditionalAddressComplete = (address: AddressData) => {
    return address.street.trim() && 
           address.city.trim() && 
           address.state && 
           address.zipCode.trim() &&
           address.moveDate;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      onAddressSubmit(fullAddress);
      setIsSubmitted(true);
    }
  };

  const handleUnlock = () => {
    setIsSubmitted(false);
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
          <div className="space-y-6">
            <div className="p-4 bg-success-light rounded-lg border border-success/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Lock className="h-5 w-5 text-success" />
                  <div>
                    <p className="font-medium text-black">Address Information Confirmed</p>
                    <p className="text-sm text-success/80">Both addresses locked and verified</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleUnlock}
                  className="flex items-center gap-2"
                >
                  <Unlock className="h-4 w-4" />
                  Unlock to Edit
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-black mb-2">New Address:</h4>
                  <p className="text-black">{fullAddress}</p>
                </div>
                
                {(oldAddress.street || oldAddress.city || oldAddress.state || oldAddress.zipCode) && (
                  <div>
                    <h4 className="text-sm font-semibold text-black mb-2">Previous Address:</h4>
                    <p className="text-black">
                      {[
                        oldAddress.street && oldAddress.apartment ? `${oldAddress.street}, ${oldAddress.apartment}` : oldAddress.street,
                        oldAddress.city,
                        oldAddress.state,
                        oldAddress.zipCode
                      ].filter(Boolean).join(', ')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* New Address Section (Main Form) */}
            <Collapsible open={isNewAddressOpen} onOpenChange={setIsNewAddressOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                  <div className="flex items-center gap-2 flex-1">
                    <h3 className="text-lg font-medium text-foreground border-b border-border pb-2 flex-1 text-left">
                      New Address
                    </h3>
                    {!isNewAddressOpen && (
                      isNewAddressComplete() ? 
                        <Check className="h-4 w-4 text-green-600" /> : 
                        <X className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  {isNewAddressOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4 mt-4">
                <div className="space-y-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">Address Type</Label>
                      <Select
                        value={newAddress.addressType}
                        onValueChange={(value: 'residential' | 'mailing') => updateNewAddressField('addressType', value)}
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
                      value={newAddress.street}
                      onChange={(e) => updateNewAddressField('street', e.target.value)}
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
                        value={newAddress.apartment}
                        onChange={(e) => updateNewAddressField('apartment', e.target.value)}
                        className="h-11 border-border"
                        disabled={isSubmitted}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">City</Label>
                      <Input
                        type="text"
                        placeholder="San Francisco"
                        value={newAddress.city}
                        onChange={(e) => updateNewAddressField('city', e.target.value)}
                        className="h-11 border-border"
                        disabled={isSubmitted}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">ZIP Code</Label>
                      <Input
                        type="text"
                        placeholder="94105"
                        value={newAddress.zipCode}
                        onChange={(e) => updateNewAddressField('zipCode', e.target.value)}
                        className="h-11 border-border"
                        disabled={isSubmitted}
                        maxLength={5}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">State</Label>
                    <Select
                      value={newAddress.state}
                      onValueChange={(value) => updateNewAddressField('state', value)}
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
                            !newAddress.moveDate && "text-muted-foreground"
                          )}
                          disabled={isSubmitted}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newAddress.moveDate ? format(newAddress.moveDate, "PPP") : <span>mm/dd/yyyy</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={newAddress.moveDate}
                          onSelect={(date) => updateNewAddressField('moveDate', date)}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>


            {/* Additional Addresses Section */}
            {additionalAddresses.length > 0 && (
              <Collapsible open={isAdditionalAddressOpen} onOpenChange={setIsAdditionalAddressOpen}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                    <div className="flex items-center gap-2 flex-1">
                      <h3 className="text-lg font-medium text-foreground border-b border-border pb-2 flex-1 text-left">
                        Additional Addresses
                      </h3>
                      {!isAdditionalAddressOpen && additionalAddresses.length > 0 && (
                        <div className="flex items-center gap-1">
                          {additionalAddresses.every(addr => isAdditionalAddressComplete(addr)) ? 
                            <Check className="h-4 w-4 text-green-600" /> : 
                            <X className="h-4 w-4 text-red-500" />
                          }
                          <span className="text-xs text-muted-foreground">
                            {additionalAddresses.filter(addr => isAdditionalAddressComplete(addr)).length}/{additionalAddresses.length}
                          </span>
                        </div>
                      )}
                    </div>
                    {isAdditionalAddressOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4 mt-4">
                  {additionalAddresses.map((address, index) => (
                    <div key={index} className="space-y-4 p-4 bg-background border border-border rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">
                          Additional Address {index + 1}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAdditionalAddress(index)}
                          className="text-destructive hover:text-destructive"
                          disabled={isSubmitted}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-foreground">Address Type</Label>
                          <Select
                            value={address.addressType}
                            onValueChange={(value: 'residential' | 'mailing') => updateAdditionalAddressField(index, 'addressType', value)}
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
                          onChange={(e) => updateAdditionalAddressField(index, 'street', e.target.value)}
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
                            onChange={(e) => updateAdditionalAddressField(index, 'apartment', e.target.value)}
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
                            onChange={(e) => updateAdditionalAddressField(index, 'city', e.target.value)}
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
                            onChange={(e) => updateAdditionalAddressField(index, 'zipCode', e.target.value)}
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
                          onValueChange={(value) => updateAdditionalAddressField(index, 'state', value)}
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
                              onSelect={(date) => updateAdditionalAddressField(index, 'moveDate', date)}
                              initialFocus
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* Add Additional Address Button */}
            <div className="flex justify-center">
              <Button
                type="button"
                variant="outline"
                onClick={addAdditionalAddress}
                disabled={isSubmitted}
              >
                <Plus className="h-4 w-4 mr-2" />
                Additional Address
              </Button>
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