import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  FileText,
  CreditCard,
  Building,
  Users,
  Lock,
  Unlock,
  Edit3,
  Save,
  Calendar,
  MapPin,
  Zap,
  Flame,
  Phone,
  Wifi,
  Droplets,
  Camera,
  Upload,
  Building2
} from "lucide-react";

interface SectionState {
  isLocked: boolean;
  isEditing: boolean;
}

interface OfficeInfo {
  name: string;
  address: string;
  phone: string;
  distance: string;
}

const AdditionalInfo = () => {
  const [sections, setSections] = useState<Record<string, SectionState>>({
    personal: { isLocked: true, isEditing: false },
    employment: { isLocked: true, isEditing: false },
    addresses: { isLocked: true, isEditing: false },
    gas: { isLocked: true, isEditing: false },
    electric: { isLocked: true, isEditing: false },
    phone: { isLocked: true, isEditing: false },
    internet: { isLocked: true, isEditing: false },
    water: { isLocked: true, isEditing: false },
    irs: { isLocked: true, isEditing: false },
    statetax: { isLocked: true, isEditing: false },
    emergency: { isLocked: true, isEditing: false }
  });

  const [newAddress] = useState("123 Oak Street, Austin, TX 78701"); // Mock new address
  const [officeLocations, setOfficeLocations] = useState<Record<string, OfficeInfo | null>>({
    gas: null,
    electric: null,
    phone: null,
    internet: null,
    water: null,
    irs: null,
    statetax: null
  });

  // Mock function to find nearest office based on service type and address
  const findNearestOffice = (serviceType: string, address: string): OfficeInfo => {
    const mockOffices: Record<string, OfficeInfo> = {
      gas: {
        name: "Texas Gas Service - Austin Office",
        address: "1601 Lamar Blvd, Austin, TX 78701",
        phone: "(512) 370-8243",
        distance: "2.3 miles"
      },
      electric: {
        name: "Austin Energy Customer Service",
        address: "721 Barton Springs Rd, Austin, TX 78704",
        phone: "(512) 494-9400",
        distance: "1.8 miles"
      },
      phone: {
        name: "AT&T Store - Downtown Austin",
        address: "308 Congress Ave, Austin, TX 78701",
        phone: "(512) 474-0500",
        distance: "0.9 miles"
      },
      internet: {
        name: "Spectrum Store - Austin Central",
        address: "2525 W Anderson Ln, Austin, TX 78757",
        phone: "(833) 267-6094",
        distance: "4.2 miles"
      },
      water: {
        name: "Austin Water Utility Customer Service",
        address: "625 E 10th St, Austin, TX 78701",
        phone: "(512) 972-0101",
        distance: "1.2 miles"
      },
      irs: {
        name: "IRS Taxpayer Assistance Center",
        address: "300 E 8th St, Austin, TX 78701",
        phone: "(844) 545-5640",
        distance: "0.7 miles"
      },
      statetax: {
        name: "Texas Comptroller Field Office",
        address: "111 E 17th St, Austin, TX 78774",
        phone: "(512) 463-4600",
        distance: "1.5 miles"
      }
    };
    
    return mockOffices[serviceType] || {
      name: "Office Location Not Found",
      address: "Please contact service provider",
      phone: "N/A",
      distance: "N/A"
    };
  };

  // Load office locations on component mount
  useEffect(() => {
    const serviceTypes = ['gas', 'electric', 'phone', 'internet', 'water', 'irs', 'statetax'];
    const newOfficeLocations: Record<string, OfficeInfo | null> = {};
    
    serviceTypes.forEach(serviceType => {
      newOfficeLocations[serviceType] = findNearestOffice(serviceType, newAddress);
    });
    
    setOfficeLocations(newOfficeLocations);
  }, [newAddress]);

  const handleFileUpload = (sectionId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log(`Uploading ${sectionId} bill photo:`, file.name);
      // Here you would typically upload the file to your backend for OCR processing
    }
  };

  const toggleLock = (sectionId: string) => {
    setSections(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        isLocked: !prev[sectionId].isLocked,
        isEditing: false
      }
    }));
  };

  const toggleEdit = (sectionId: string) => {
    if (sections[sectionId].isLocked) return;
    
    setSections(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        isEditing: !prev[sectionId].isEditing
      }
    }));
  };

  const saveSection = (sectionId: string) => {
    setSections(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        isEditing: false
      }
    }));
    // Here you would typically save the data to your backend
    console.log(`Saving ${sectionId} section`);
  };

  const renderSectionHeader = (sectionId: string, title: string, description: string, icon: React.ReactNode) => {
    const section = sections[sectionId];
    
    return (
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            {icon}
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => toggleLock(sectionId)}
            className={section.isLocked ? "text-red-600" : "text-green-600"}
          >
            {section.isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
          </Button>
          {!section.isLocked && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => toggleEdit(sectionId)}
              disabled={section.isLocked}
            >
              <Edit3 className="w-4 h-4 mr-2" />
              {section.isEditing ? "Cancel" : "Edit"}
            </Button>
          )}
        </div>
      </CardHeader>
    );
  };

  const renderOfficeInfo = (serviceType: string) => {
    const office = officeLocations[serviceType];
    
    if (!office) {
      return (
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Building2 className="w-4 h-4" />
            <span className="text-sm">Loading nearest office...</span>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-muted/50 rounded-lg p-4 space-y-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 text-foreground">
            <Building2 className="w-4 h-4 mt-0.5" />
            <div>
              <p className="font-medium text-sm">{office.name}</p>
              <p className="text-xs text-muted-foreground">{office.distance} from new address</p>
            </div>
          </div>
        </div>
        <div className="space-y-1 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="w-3 h-3" />
            <span>{office.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-3 h-3" />
            <span>{office.phone}</span>
          </div>
        </div>
      </div>
    );
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
                <a href="/" className="text-sm text-muted-foreground hover:text-foreground">Dashboard</a>
                <a href="/services" className="text-sm text-muted-foreground hover:text-foreground">Services</a>
                <a href="/documents" className="text-sm text-muted-foreground hover:text-foreground">Documents</a>
                <a href="/additional-info" className="text-sm text-foreground font-medium">Additional Info</a>
                <a href="/support" className="text-sm text-muted-foreground hover:text-foreground">Support</a>
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
                <span className="text-sm font-medium text-foreground">morgan.acaido@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Additional Information</h1>
          <p className="text-muted-foreground">Manage additional information commonly needed for forms and applications</p>
        </div>

        <div className="grid gap-8">
          {/* Personal Information */}
          <Card className="border-border">
            {renderSectionHeader(
              "personal", 
              "Personal Information", 
              "Social security, date of birth, and identification details",
              <FileText className="w-5 h-5" />
            )}
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ssn">Social Security Number (Last 4 digits)</Label>
                  <Input 
                    id="ssn" 
                    placeholder="****" 
                    maxLength={4}
                    disabled={sections.personal.isLocked || !sections.personal.isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input 
                    id="dob" 
                    type="date" 
                    defaultValue="1990-05-15"
                    disabled={sections.personal.isLocked || !sections.personal.isEditing}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="license">Driver's License Number</Label>
                  <Input 
                    id="license" 
                    placeholder="Enter license number" 
                    disabled={sections.personal.isLocked || !sections.personal.isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="licenseState">License State</Label>
                  <Input 
                    id="licenseState" 
                    placeholder="e.g., CA" 
                    disabled={sections.personal.isLocked || !sections.personal.isEditing}
                  />
                </div>
              </div>
              {sections.personal.isEditing && (
                <div className="flex gap-2">
                  <Button onClick={() => saveSection("personal")}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => toggleEdit("personal")}>Cancel</Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Employment Information */}
          <Card className="border-border">
            {renderSectionHeader(
              "employment", 
              "Employment Information", 
              "Employer details and work address",
              <Building className="w-5 h-5" />
            )}
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employer">Employer Name</Label>
                  <Input 
                    id="employer" 
                    placeholder="Enter employer name" 
                    disabled={sections.employment.isLocked || !sections.employment.isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input 
                    id="jobTitle" 
                    placeholder="Enter job title" 
                    disabled={sections.employment.isLocked || !sections.employment.isEditing}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="workAddress">Work Address</Label>
                <Input 
                  id="workAddress" 
                  placeholder="Enter work address" 
                  disabled={sections.employment.isLocked || !sections.employment.isEditing}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="workPhone">Work Phone</Label>
                  <Input 
                    id="workPhone" 
                    type="tel"
                    placeholder="Enter work phone" 
                    disabled={sections.employment.isLocked || !sections.employment.isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary">Annual Salary</Label>
                  <Input 
                    id="salary" 
                    placeholder="Enter annual salary" 
                    disabled={sections.employment.isLocked || !sections.employment.isEditing}
                  />
                </div>
              </div>
              {sections.employment.isEditing && (
                <div className="flex gap-2">
                  <Button onClick={() => saveSection("employment")}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => toggleEdit("employment")}>Cancel</Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Address History */}
          <Card className="border-border">
            {renderSectionHeader(
              "addresses", 
              "Address History", 
              "Previous and forwarding addresses",
              <MapPin className="w-5 h-5" />
            )}
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="previousAddress">Previous Address</Label>
                <Input 
                  id="previousAddress" 
                  placeholder="Enter your previous address" 
                  disabled={sections.addresses.isLocked || !sections.addresses.isEditing}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="moveInDate">Move-in Date (Previous)</Label>
                  <Input 
                    id="moveInDate" 
                    type="date"
                    disabled={sections.addresses.isLocked || !sections.addresses.isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="moveOutDate">Move-out Date (Previous)</Label>
                  <Input 
                    id="moveOutDate" 
                    type="date"
                    disabled={sections.addresses.isLocked || !sections.addresses.isEditing}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="forwardingAddress">Mail Forwarding Address</Label>
                <Input 
                  id="forwardingAddress" 
                  placeholder="Enter forwarding address if different from current" 
                  disabled={sections.addresses.isLocked || !sections.addresses.isEditing}
                />
              </div>
              {sections.addresses.isEditing && (
                <div className="flex gap-2">
                  <Button onClick={() => saveSection("addresses")}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => toggleEdit("addresses")}>Cancel</Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Gas Service */}
          <Card className="border-border">
            {renderSectionHeader(
              "gas", 
              "Gas Service", 
              "Gas utility provider and account information",
              <Flame className="w-5 h-5 text-orange-500" />
            )}
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gasProvider">Gas Provider</Label>
                  <Input 
                    id="gasProvider" 
                    placeholder="e.g., National Grid, ConEd" 
                    disabled={sections.gas.isLocked || !sections.gas.isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gasAccount">Account Number</Label>
                  <Input 
                    id="gasAccount" 
                    placeholder="Enter account number" 
                    disabled={sections.gas.isLocked || !sections.gas.isEditing}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Upload Gas Bill Photo</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-4">
                  <div className="flex flex-col items-center gap-2">
                    <Camera className="w-8 h-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground text-center">
                      Upload or take a photo of your gas bill for automatic data extraction
                    </p>
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={(e) => handleFileUpload("gas", e)}
                        className="hidden"
                        disabled={sections.gas.isLocked}
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        disabled={sections.gas.isLocked}
                        asChild
                      >
                        <span>
                          <Upload className="w-4 h-4 mr-2" />
                          Choose Photo
                        </span>
                      </Button>
                    </label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Nearest Gas Office</Label>
                {renderOfficeInfo("gas")}
              </div>
              {sections.gas.isEditing && (
                <div className="flex gap-2">
                  <Button onClick={() => saveSection("gas")}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => toggleEdit("gas")}>Cancel</Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Electric Service */}
          <Card className="border-border">
            {renderSectionHeader(
              "electric", 
              "Electric Service", 
              "Electric utility provider and account information",
              <Zap className="w-5 h-5 text-yellow-500" />
            )}
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="electricProvider">Electric Provider</Label>
                  <Input 
                    id="electricProvider" 
                    placeholder="e.g., ConEd, PG&E" 
                    disabled={sections.electric.isLocked || !sections.electric.isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="electricAccount">Account Number</Label>
                  <Input 
                    id="electricAccount" 
                    placeholder="Enter account number" 
                    disabled={sections.electric.isLocked || !sections.electric.isEditing}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Upload Electric Bill Photo</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-4">
                  <div className="flex flex-col items-center gap-2">
                    <Camera className="w-8 h-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground text-center">
                      Upload or take a photo of your electric bill for automatic data extraction
                    </p>
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={(e) => handleFileUpload("electric", e)}
                        className="hidden"
                        disabled={sections.electric.isLocked}
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        disabled={sections.electric.isLocked}
                        asChild
                      >
                        <span>
                          <Upload className="w-4 h-4 mr-2" />
                          Choose Photo
                        </span>
                      </Button>
                    </label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Nearest Electric Office</Label>
                {renderOfficeInfo("electric")}
              </div>
              {sections.electric.isEditing && (
                <div className="flex gap-2">
                  <Button onClick={() => saveSection("electric")}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => toggleEdit("electric")}>Cancel</Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Phone Service */}
          <Card className="border-border">
            {renderSectionHeader(
              "phone", 
              "Phone Service", 
              "Phone service provider and account information",
              <Phone className="w-5 h-5 text-green-500" />
            )}
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phoneProvider">Phone Provider</Label>
                  <Input 
                    id="phoneProvider" 
                    placeholder="e.g., Verizon, AT&T" 
                    disabled={sections.phone.isLocked || !sections.phone.isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneAccount">Account Number</Label>
                  <Input 
                    id="phoneAccount" 
                    placeholder="Enter account number" 
                    disabled={sections.phone.isLocked || !sections.phone.isEditing}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Upload Phone Bill Photo</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-4">
                  <div className="flex flex-col items-center gap-2">
                    <Camera className="w-8 h-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground text-center">
                      Upload or take a photo of your phone bill for automatic data extraction
                    </p>
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={(e) => handleFileUpload("phone", e)}
                        className="hidden"
                        disabled={sections.phone.isLocked}
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        disabled={sections.phone.isLocked}
                        asChild
                      >
                        <span>
                          <Upload className="w-4 h-4 mr-2" />
                          Choose Photo
                        </span>
                      </Button>
                    </label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Nearest Phone Office</Label>
                {renderOfficeInfo("phone")}
              </div>
              {sections.phone.isEditing && (
                <div className="flex gap-2">
                  <Button onClick={() => saveSection("phone")}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => toggleEdit("phone")}>Cancel</Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Internet Service */}
          <Card className="border-border">
            {renderSectionHeader(
              "internet", 
              "Internet Service", 
              "Internet service provider and account information",
              <Wifi className="w-5 h-5 text-blue-500" />
            )}
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="internetProvider">Internet Provider</Label>
                  <Input 
                    id="internetProvider" 
                    placeholder="e.g., Comcast, Spectrum" 
                    disabled={sections.internet.isLocked || !sections.internet.isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="internetAccount">Account Number</Label>
                  <Input 
                    id="internetAccount" 
                    placeholder="Enter account number" 
                    disabled={sections.internet.isLocked || !sections.internet.isEditing}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Upload Internet Bill Photo</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-4">
                  <div className="flex flex-col items-center gap-2">
                    <Camera className="w-8 h-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground text-center">
                      Upload or take a photo of your internet bill for automatic data extraction
                    </p>
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={(e) => handleFileUpload("internet", e)}
                        className="hidden"
                        disabled={sections.internet.isLocked}
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        disabled={sections.internet.isLocked}
                        asChild
                      >
                        <span>
                          <Upload className="w-4 h-4 mr-2" />
                          Choose Photo
                        </span>
                      </Button>
                    </label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Nearest Internet Office</Label>
                {renderOfficeInfo("internet")}
              </div>
              {sections.internet.isEditing && (
                <div className="flex gap-2">
                  <Button onClick={() => saveSection("internet")}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => toggleEdit("internet")}>Cancel</Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Water Service */}
          <Card className="border-border">
            {renderSectionHeader(
              "water", 
              "Water Service", 
              "Water utility provider and account information",
              <Droplets className="w-5 h-5 text-blue-600" />
            )}
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="waterProvider">Water Provider</Label>
                  <Input 
                    id="waterProvider" 
                    placeholder="e.g., City Water, Local Municipality" 
                    disabled={sections.water.isLocked || !sections.water.isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="waterAccount">Account Number</Label>
                  <Input 
                    id="waterAccount" 
                    placeholder="Enter account number" 
                    disabled={sections.water.isLocked || !sections.water.isEditing}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Upload Water Bill Photo</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-4">
                  <div className="flex flex-col items-center gap-2">
                    <Camera className="w-8 h-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground text-center">
                      Upload or take a photo of your water bill for automatic data extraction
                    </p>
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={(e) => handleFileUpload("water", e)}
                        className="hidden"
                        disabled={sections.water.isLocked}
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        disabled={sections.water.isLocked}
                        asChild
                      >
                        <span>
                          <Upload className="w-4 h-4 mr-2" />
                          Choose Photo
                        </span>
                      </Button>
                    </label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Nearest Water Office</Label>
                {renderOfficeInfo("water")}
              </div>
              {sections.water.isEditing && (
                <div className="flex gap-2">
                  <Button onClick={() => saveSection("water")}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => toggleEdit("water")}>Cancel</Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* IRS Information */}
          <Card className="border-border">
            {renderSectionHeader(
              "irs", 
              "IRS Information", 
              "Tax identification and IRS-related documentation",
              <FileText className="w-5 h-5 text-red-600" />
            )}
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ein">Employer Identification Number (EIN)</Label>
                  <Input 
                    id="ein" 
                    placeholder="XX-XXXXXXX" 
                    disabled={sections.irs.isLocked || !sections.irs.isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxId">Tax ID / ITIN</Label>
                  <Input 
                    id="taxId" 
                    placeholder="Enter Tax ID or ITIN" 
                    disabled={sections.irs.isLocked || !sections.irs.isEditing}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Upload IRS Document Photo</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-4">
                  <div className="flex flex-col items-center gap-2">
                    <Camera className="w-8 h-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground text-center">
                      Upload or take a photo of your IRS documents for automatic data extraction
                    </p>
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={(e) => handleFileUpload("irs", e)}
                        className="hidden"
                        disabled={sections.irs.isLocked}
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        disabled={sections.irs.isLocked}
                        asChild
                      >
                        <span>
                          <Upload className="w-4 h-4 mr-2" />
                          Choose Photo
                        </span>
                      </Button>
                    </label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Nearest IRS Office</Label>
                {renderOfficeInfo("irs")}
              </div>
              {sections.irs.isEditing && (
                <div className="flex gap-2">
                  <Button onClick={() => saveSection("irs")}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => toggleEdit("irs")}>Cancel</Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* State Tax Board Information */}
          <Card className="border-border">
            {renderSectionHeader(
              "statetax", 
              "State Tax Board", 
              "State tax board registration and documentation",
              <Building className="w-5 h-5 text-purple-600" />
            )}
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stateRegistration">State Registration Number</Label>
                  <Input 
                    id="stateRegistration" 
                    placeholder="Enter state registration number" 
                    disabled={sections.statetax.isLocked || !sections.statetax.isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxBoardState">State</Label>
                  <Input 
                    id="taxBoardState" 
                    placeholder="e.g., TX, CA, NY" 
                    disabled={sections.statetax.isLocked || !sections.statetax.isEditing}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Upload State Tax Document Photo</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-4">
                  <div className="flex flex-col items-center gap-2">
                    <Camera className="w-8 h-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground text-center">
                      Upload or take a photo of your state tax documents for automatic data extraction
                    </p>
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={(e) => handleFileUpload("statetax", e)}
                        className="hidden"
                        disabled={sections.statetax.isLocked}
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        disabled={sections.statetax.isLocked}
                        asChild
                      >
                        <span>
                          <Upload className="w-4 h-4 mr-2" />
                          Choose Photo
                        </span>
                      </Button>
                    </label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Nearest State Tax Office</Label>
                {renderOfficeInfo("statetax")}
              </div>
              {sections.statetax.isEditing && (
                <div className="flex gap-2">
                  <Button onClick={() => saveSection("statetax")}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => toggleEdit("statetax")}>Cancel</Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Emergency Contacts */}
          <Card className="border-border">
            {renderSectionHeader(
              "emergency", 
              "Emergency Contacts", 
              "Emergency contact information",
              <Users className="w-5 h-5" />
            )}
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                  <Input 
                    id="emergencyContact" 
                    placeholder="Enter emergency contact" 
                    disabled={sections.emergency.isLocked || !sections.emergency.isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                  <Input 
                    id="emergencyPhone" 
                    type="tel" 
                    placeholder="Enter phone number" 
                    disabled={sections.emergency.isLocked || !sections.emergency.isEditing}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyRelation">Relationship</Label>
                  <Input 
                    id="emergencyRelation" 
                    placeholder="e.g., Spouse, Parent, Sibling" 
                    disabled={sections.emergency.isLocked || !sections.emergency.isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyEmail">Emergency Contact Email</Label>
                  <Input 
                    id="emergencyEmail" 
                    type="email"
                    placeholder="Enter email address" 
                    disabled={sections.emergency.isLocked || !sections.emergency.isEditing}
                  />
                </div>
              </div>
              {sections.emergency.isEditing && (
                <div className="flex gap-2">
                  <Button onClick={() => saveSection("emergency")}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => toggleEdit("emergency")}>Cancel</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdditionalInfo;