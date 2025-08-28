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
  CheckCircle
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
                  <div className="px-4 pb-4 space-y-3">
                    {category.services.map((service) => (
                      <div key={service.name} className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-muted/50">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(service.status)}
                          <span className="text-sm font-medium text-foreground">{service.name}</span>
                        </div>
                        {getStatusBadge(service.status)}
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