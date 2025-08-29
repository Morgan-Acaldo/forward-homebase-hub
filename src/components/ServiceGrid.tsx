import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Building2, 
  CreditCard, 
  Shield, 
  Globe,
  ChevronDown,
  ChevronUp,
  Search,
  Check,
  Clock,
  CheckCircle,
  FileText,
  Zap,
  Package,
  Plus
} from "lucide-react";

const serviceCategories = [
  {
    title: "Government & Legal",
    icon: Building2,
    count: 5,
    services: [
      { name: "DMV", status: "pending" as const },
      { name: "Voter Registration", status: "pending" as const },
      { name: "IRS", status: "pending" as const },
      { name: "State Tax Board", status: "pending" as const },
      { name: "USPS", status: "pending" as const },
    ]
  },
  {
    title: "Financial Services",
    icon: CreditCard,
    count: 8,
    services: [
      { name: "Chase Bank", status: "complete" as const },
      { name: "American Express", status: "complete" as const },
      { name: "Wells Fargo", status: "pending" as const },
      { name: "Fidelity Investments", status: "pending" as const },
      { name: "PayPal", status: "pending" as const },
      { name: "Citibank", status: "pending" as const },
      { name: "Bank of America", status: "pending" as const },
      { name: "Capital One", status: "pending" as const },
    ]
  },
  {
    title: "Insurance",
    icon: Shield,
    count: 3,
    services: [
      { name: "State Farm Auto", status: "complete" as const },
      { name: "Blue Cross Health", status: "complete" as const },
      { name: "Progressive Home", status: "pending" as const },
    ]
  },
  {
    title: "Subscriptions & Services",
    icon: Globe,
    count: 12,
    services: [
      { name: "Amazon Prime", status: "complete" as const },
      { name: "Netflix", status: "complete" as const },
      { name: "Spotify", status: "pending" as const },
      { name: "Gym Membership", status: "pending" as const },
      { name: "Electric Company", status: "pending" as const },
      { name: "Gas Company", status: "pending" as const },
      { name: "Internet Provider", status: "pending" as const },
      { name: "Cable TV", status: "pending" as const },
      { name: "Water & Sewer", status: "pending" as const },
      { name: "Trash Collection", status: "pending" as const },
      { name: "Security System", status: "pending" as const },
      { name: "Lawn Service", status: "pending" as const },
    ]
  }
];

interface ServiceGridProps {
  isAddressLocked: boolean;
}

export const ServiceGrid = ({ isAddressLocked }: ServiceGridProps) => {
  const [openCategories, setOpenCategories] = useState<string[]>(['Financial Services']);
  const [searchQuery, setSearchQuery] = useState("");
  const [categorySearchTerms, setCategorySearchTerms] = useState<{[key: string]: string}>({});

  const toggleCategory = (categoryTitle: string) => {
    setOpenCategories(prev => 
      prev.includes(categoryTitle)
        ? prev.filter(title => title !== categoryTitle)
        : [...prev, categoryTitle]
    );
  };

  const getStatusBadge = (status: 'complete' | 'pending') => {
    if (status === 'complete') {
      return <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">Complete</Badge>;
    }
    return <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-100">Pending</Badge>;
  };

  const getStatusIcon = (status: 'complete' | 'pending') => {
    if (status === 'complete') {
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    }
    return <Clock className="h-4 w-4 text-orange-600" />;
  };

  const handleFormClick = (serviceName: string) => {
    console.log(`Opening form for ${serviceName}`);
    // Handle form functionality here
  };

  const handleAutomateClick = (serviceName: string) => {
    console.log(`Setting up automation for ${serviceName}`);
    // Handle automation functionality here
  };

  const handleAutomateAll = (categoryTitle: string) => {
    console.log(`Automating all services in ${categoryTitle}`);
    // Handle automating all services in this category
  };

  const handleFormPackage = (categoryTitle: string) => {
    console.log(`Creating form package for ${categoryTitle}`);
    // Handle creating form package for this category
  };

  const handleSearchService = (categoryTitle: string, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && categorySearchTerms[categoryTitle]?.trim()) {
      console.log(`Searching for service: ${categorySearchTerms[categoryTitle]} in ${categoryTitle}`);
      // Handle adding new service functionality here
      setCategorySearchTerms(prev => ({ ...prev, [categoryTitle]: "" }));
    }
  };

  const handleAddService = (categoryTitle: string) => {
    if (categorySearchTerms[categoryTitle]?.trim()) {
      console.log(`Adding service: ${categorySearchTerms[categoryTitle]} to ${categoryTitle}`);
      // Handle adding new service functionality here
      setCategorySearchTerms(prev => ({ ...prev, [categoryTitle]: "" }));
    }
  };

  const updateCategorySearchTerm = (categoryTitle: string, value: string) => {
    setCategorySearchTerms(prev => ({ ...prev, [categoryTitle]: value }));
  };

  return (
    <div className="w-full space-y-8">
      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search for services (e.g., Chase Bank, Netflix, DMV)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-11"
        />
      </div>

      {/* Service Categories */}
      <div className="space-y-4">
        {serviceCategories.map((category) => {
          const isOpen = openCategories.includes(category.title);
          const IconComponent = category.icon;
          
          return (
            <Collapsible key={category.title} open={isOpen} onOpenChange={() => toggleCategory(category.title)}>
              <div className="border rounded-lg bg-card">
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full h-auto p-4 justify-between hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-muted rounded-lg">
                        <IconComponent className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-medium text-foreground">{category.title}</h3>
                        <p className="text-sm text-muted-foreground">{category.count} services connected</p>
                      </div>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  <div className="px-4 pt-2 pb-4 space-y-3">
                    <div className="flex gap-2 pb-3 border-b border-border">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAutomateAll(category.title);
                        }}
                        className="text-xs"
                      >
                        <Zap className="h-3 w-3 mr-1" />
                        Automate All
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFormPackage(category.title);
                        }}
                        className="text-xs"
                      >
                        <Package className="h-3 w-3 mr-1" />
                        Form Package
                      </Button>
                    </div>
                    
                    {/* Search field to add new services */}
                    <div className="flex gap-2 p-3 bg-muted/20 rounded-lg border-dashed border-2 border-border">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search or add new service..."
                          value={categorySearchTerms[category.title] || ""}
                          onChange={(e) => updateCategorySearchTerm(category.title, e.target.value)}
                          onKeyDown={(e) => handleSearchService(category.title, e)}
                          className="pl-10"
                        />
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddService(category.title)}
                        disabled={!categorySearchTerms[category.title]?.trim()}
                        className="flex-shrink-0"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                    {category.services.map((service) => (
                       <div key={service.name} className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-muted/50">
                         <div className="flex items-center gap-3">
                           {getStatusIcon(service.status)}
                           <span className="text-sm font-medium text-foreground">{service.name}</span>
                         </div>
                         <div className="flex items-center gap-2">
                           <Button
                             variant="outline"
                             size="sm"
                             onClick={(e) => {
                               e.stopPropagation();
                               handleFormClick(service.name);
                             }}
                             className="text-xs px-2 py-1"
                           >
                             <FileText className="h-3 w-3 mr-1" />
                             Form
                           </Button>
                           
                           <Button
                             variant="outline"
                             size="sm"
                             onClick={(e) => {
                               e.stopPropagation();
                               handleAutomateClick(service.name);
                             }}
                             className="text-xs px-2 py-1"
                           >
                             <Zap className="h-3 w-3 mr-1" />
                             Automate
                           </Button>
                           
                           {getStatusBadge(service.status)}
                         </div>
                       </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          );
        })}
      </div>
    </div>
  );
};