import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronDown, 
  ChevronRight, 
  CheckCircle, 
  Clock, 
  ArrowRight,
  LucideIcon,
  FileText,
  Zap,
  Package
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