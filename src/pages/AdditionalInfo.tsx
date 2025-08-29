import { useState } from "react";
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
  MapPin
} from "lucide-react";

interface SectionState {
  isLocked: boolean;
  isEditing: boolean;
}

const AdditionalInfo = () => {
  const [sections, setSections] = useState<Record<string, SectionState>>({
    personal: { isLocked: true, isEditing: false },
    employment: { isLocked: true, isEditing: false },
    addresses: { isLocked: true, isEditing: false },
    emergency: { isLocked: true, isEditing: false }
  });

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