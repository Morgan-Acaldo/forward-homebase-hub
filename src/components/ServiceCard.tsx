import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ChevronDown, 
  ChevronRight, 
  CheckCircle, 
  Clock, 
  ArrowRight,
  LucideIcon,
  FileText,
  Zap,
  Package,
  Search,
  Plus,
  X
} from "lucide-react";

interface Service {
  name: string;
  icon: LucideIcon;
  status: "pending" | "completed" | "in-progress";
}

interface ServiceCategory {
  title: string;
  description: string;
  icon: LucideIcon;
  color: "primary" | "success" | "warning";
  services: Service[];
}

interface ServiceCardProps {
  category: ServiceCategory;
  isEnabled: boolean;
  delay: number;
}

export const ServiceCard = ({ category, isEnabled, delay }: ServiceCardProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [completedServices, setCompletedServices] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");

  const handleServiceUpdate = (serviceName: string) => {
    setCompletedServices(prev => {
      const newSet = new Set(prev);
      if (newSet.has(serviceName)) {
        newSet.delete(serviceName);
      } else {
        newSet.add(serviceName);
      }
      return newSet;
    });
  };

  const handleFormClick = (serviceName: string) => {
    console.log(`Opening form for ${serviceName}`);
    // Handle form functionality here
  };

  const handleAutomateClick = (serviceName: string) => {
    console.log(`Setting up automation for ${serviceName}`);
    // Handle automation functionality here
  };

  const handleAutomateAll = () => {
    console.log(`Automating all services in ${category.title}`);
    // Handle automating all services in this category
  };

  const handleFormPackage = () => {
    console.log(`Creating form package for ${category.title}`);
    // Handle creating form package for this category
  };

  const handleSearchService = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      console.log(`Searching for service: ${searchTerm} in ${category.title}`);
      // Handle adding new service functionality here
      setSearchTerm("");
    }
  };

  const handleAddService = () => {
    if (searchTerm.trim()) {
      console.log(`Adding service: ${searchTerm} to ${category.title}`);
      // Handle adding new service functionality here
      setSearchTerm("");
    }
  };

  const handleRemoveService = (serviceName: string) => {
    console.log(`Removing service: ${serviceName} from ${category.title}`);
    // Handle removing service functionality here
  };

  const completedCount = completedServices.size;
  const totalServices = category.services.length;
  const progressPercentage = (completedCount / totalServices) * 100;

  const getColorClasses = (color: string) => {
    switch (color) {
      case "success":
        return {
          bg: "bg-success-light",
          text: "text-success",
          border: "border-success/20",
          button: "success"
        };
      case "warning":
        return {
          bg: "bg-warning-light", 
          text: "text-warning",
          border: "border-warning/20",
          button: "warning"
        };
      default:
        return {
          bg: "bg-primary-light",
          text: "text-primary", 
          border: "border-primary/20",
          button: "primary"
        };
    }
  };

  const colors = getColorClasses(category.color);

  return (
    <Card 
      className={`transition-all duration-300 hover:shadow-lg border-0 shadow-card ${
        isEnabled ? 'cursor-pointer' : 'opacity-60'
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardHeader 
        className="pb-4 cursor-pointer"
        onClick={() => isEnabled && setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${colors.bg} ${colors.border} border`}>
              <category.icon className={`h-5 w-5 ${colors.text}`} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground text-lg">{category.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
              
              {isEnabled && (
                <div className="mt-4 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAutomateAll();
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
                      handleFormPackage();
                    }}
                    className="text-xs"
                  >
                    <Package className="h-3 w-3 mr-1" />
                    Form Package
                  </Button>
                </div>
              )}
              
              {isEnabled && (
                <div className="mt-3">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">
                      {completedCount} of {totalServices} completed
                    </span>
                    <span className="text-foreground font-medium">
                      {Math.round(progressPercentage)}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full bg-gradient-${category.color} transition-all duration-500`}
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {isEnabled && (
            <div className="flex items-center gap-2">
              {completedCount === totalServices && (
                <CheckCircle className="h-5 w-5 text-success" />
              )}
              {isExpanded ? (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
          )}
        </div>
      </CardHeader>

      {isExpanded && isEnabled && (
        <CardContent className="pt-0">
          <div className="space-y-3">
            {/* Search field to add new services */}
            <div className="flex gap-2 p-3 bg-muted/20 rounded-lg border-dashed border-2 border-border">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search or add new service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleSearchService}
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddService}
                disabled={!searchTerm.trim()}
                className="flex-shrink-0"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
            {category.services.map((service) => {
              const isCompleted = completedServices.has(service.name);
              return (
                <div
                  key={service.name}
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors border"
                >
                  <div className="flex items-center gap-3">
                    <service.icon className="h-4 w-4 text-muted-foreground" />
                    <span className={`font-medium ${isCompleted ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                      {service.name}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFormClick(service.name);
                      }}
                      className="text-xs px-3 py-1"
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
                      className="text-xs px-3 py-1"
                    >
                      <Zap className="h-3 w-3 mr-1" />
                      Automate
                    </Button>

                    {isCompleted ? (
                      <Badge variant="secondary" className="bg-success-light text-success px-2 py-1">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Updated
                      </Badge>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleServiceUpdate(service.name);
                        }}
                        className="text-xs px-3 py-1"
                      >
                        Update
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    )}
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveService(service.name);
                      }}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10 p-1"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      )}
    </Card>
  );
};