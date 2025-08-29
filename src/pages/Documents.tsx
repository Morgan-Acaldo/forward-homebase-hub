import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Download, 
  Search, 
  Calendar,
  Building2, 
  CreditCard, 
  Shield, 
  Truck, 
  Users, 
  Briefcase,
  Phone,
  Heart,
  Car,
  GraduationCap,
  Home
} from "lucide-react";

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const documentSections = [
    {
      id: "financial",
      title: "Financial Services",
      icon: <CreditCard className="w-5 h-5" />,
      description: "Bank accounts, credit cards, and investment documents",
      documents: [
        { name: "Bank of America Address Change Form", date: "2024-01-15", type: "PDF", status: "completed" },
        { name: "Chase Credit Card Update Letter", date: "2024-01-14", type: "PDF", status: "pending" },
        { name: "Fidelity Investment Account Form", date: "2024-01-12", type: "PDF", status: "completed" }
      ]
    },
    {
      id: "government",
      title: "Government Services",
      icon: <Building2 className="w-5 h-5" />,
      description: "IRS, DMV, and other government agency documents",
      documents: [
        { name: "IRS Address Change Form 8822", date: "2024-01-16", type: "PDF", status: "completed" },
        { name: "DMV Vehicle Registration Update", date: "2024-01-15", type: "PDF", status: "completed" },
        { name: "Social Security Administration Notice", date: "2024-01-13", type: "PDF", status: "pending" }
      ]
    },
    {
      id: "insurance",
      title: "Insurance",
      icon: <Shield className="w-5 h-5" />,
      description: "Health, auto, and home insurance documents",
      documents: [
        { name: "Blue Cross Blue Shield Update Form", date: "2024-01-14", type: "PDF", status: "completed" },
        { name: "State Farm Auto Insurance Change", date: "2024-01-13", type: "PDF", status: "completed" },
        { name: "Homeowners Insurance Update Letter", date: "2024-01-12", type: "PDF", status: "pending" }
      ]
    },
    {
      id: "utilities",
      title: "Utilities",
      icon: <Home className="w-5 h-5" />,
      description: "Electric, gas, water, and internet service documents",
      documents: [
        { name: "ConEd Service Transfer Request", date: "2024-01-15", type: "PDF", status: "completed" },
        { name: "Verizon Internet Service Change", date: "2024-01-14", type: "PDF", status: "completed" },
        { name: "National Grid Gas Service Form", date: "2024-01-13", type: "PDF", status: "pending" }
      ]
    },
    {
      id: "shipping",
      title: "Shipping & Delivery",
      icon: <Truck className="w-5 h-5" />,
      description: "Package forwarding and delivery service documents",
      documents: [
        { name: "UPS My Choice Address Update", date: "2024-01-14", type: "PDF", status: "completed" },
        { name: "FedEx Delivery Manager Change", date: "2024-01-13", type: "PDF", status: "completed" },
        { name: "USPS Mail Forwarding Form", date: "2024-01-12", type: "PDF", status: "pending" }
      ]
    },
    {
      id: "subscriptions",
      title: "Subscriptions & Memberships",
      icon: <Users className="w-5 h-5" />,
      description: "Magazine, streaming, and membership documents",
      documents: [
        { name: "Netflix Account Update Confirmation", date: "2024-01-13", type: "PDF", status: "completed" },
        { name: "Amazon Prime Address Change", date: "2024-01-12", type: "PDF", status: "completed" },
        { name: "Gym Membership Update Form", date: "2024-01-11", type: "PDF", status: "pending" }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success/10 text-success hover:bg-success/20";
      case "pending":
        return "bg-warning/10 text-warning hover:bg-warning/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const filteredSections = documentSections.map(section => ({
    ...section,
    documents: section.documents.filter(doc =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.documents.length > 0 || searchTerm === "");

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
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Services</a>
                <a href="/documents" className="text-sm font-medium text-foreground border-b-2 border-primary pb-1">Documents</a>
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Document Center</h1>
          <p className="text-muted-foreground">View and download all generated forms and letters for your address changes</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Document Sections */}
        <div className="space-y-8">
          {filteredSections.map((section) => (
            <Card key={section.id} className="border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {section.icon}
                  </div>
                  <div>
                    <CardTitle className="text-foreground">{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {section.documents.length > 0 ? (
                  <div className="space-y-3">
                    {section.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <h4 className="font-medium text-foreground">{doc.name}</h4>
                            <div className="flex items-center gap-4 mt-1">
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Calendar className="w-3 h-3" />
                                {doc.date}
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {doc.type}
                              </Badge>
                              <Badge className={`text-xs ${getStatusColor(doc.status)}`}>
                                {doc.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No documents found for this section</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSections.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-medium text-foreground mb-2">No documents found</h3>
            <p className="text-muted-foreground">Try adjusting your search terms</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Documents;