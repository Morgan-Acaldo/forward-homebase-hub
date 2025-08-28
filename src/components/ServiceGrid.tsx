import { ServiceCard } from "./ServiceCard";
import { 
  Building2, 
  CreditCard, 
  Shield, 
  Zap, 
  PlayCircle,
  Car,
  Vote,
  Receipt,
  MapPin,
  DollarSign
} from "lucide-react";

const serviceCategories = [
  {
    title: "Government Services",
    description: "Essential government and civic services",
    icon: Building2,
    color: "primary" as const,
    services: [
      { name: "Department of Motor Vehicles (DMV)", icon: Car, status: "pending" as const },
      { name: "Voter Registration", icon: Vote, status: "pending" as const },
      { name: "Internal Revenue Service (IRS)", icon: Receipt, status: "pending" as const },
      { name: "State Tax Board", icon: DollarSign, status: "pending" as const },
      { name: "United States Postal Service", icon: MapPin, status: "pending" as const },
    ]
  },
  {
    title: "Financial Services",
    description: "Banks, credit cards, and financial accounts",
    icon: CreditCard,
    color: "success" as const,
    services: [
      { name: "Primary Bank Account", icon: CreditCard, status: "pending" as const },
      { name: "Credit Card Companies", icon: CreditCard, status: "pending" as const },
      { name: "Investment Accounts", icon: DollarSign, status: "pending" as const },
      { name: "Mortgage Lender", icon: Building2, status: "pending" as const },
      { name: "Student Loans", icon: Receipt, status: "pending" as const },
    ]
  },
  {
    title: "Insurance",
    description: "All your insurance policies",
    icon: Shield,
    color: "warning" as const,
    services: [
      { name: "Auto Insurance", icon: Car, status: "pending" as const },
      { name: "Home/Renter's Insurance", icon: Building2, status: "pending" as const },
      { name: "Health Insurance", icon: Shield, status: "pending" as const },
      { name: "Life Insurance", icon: Shield, status: "pending" as const },
    ]
  },
  {
    title: "Utilities",
    description: "Essential home services",
    icon: Zap,
    color: "primary" as const,
    services: [
      { name: "Electric Company", icon: Zap, status: "pending" as const },
      { name: "Gas Company", icon: Zap, status: "pending" as const },
      { name: "Water & Sewer", icon: Zap, status: "pending" as const },
      { name: "Internet/Cable Provider", icon: PlayCircle, status: "pending" as const },
      { name: "Trash & Recycling", icon: Building2, status: "pending" as const },
    ]
  },
  {
    title: "Subscriptions & Services",
    description: "Digital and recurring services",
    icon: PlayCircle,
    color: "success" as const,
    services: [
      { name: "Streaming Services", icon: PlayCircle, status: "pending" as const },
      { name: "Gym Membership", icon: Building2, status: "pending" as const },
      { name: "Magazine Subscriptions", icon: Receipt, status: "pending" as const },
      { name: "Medical Providers", icon: Shield, status: "pending" as const },
    ]
  }
];

interface ServiceGridProps {
  isAddressLocked: boolean;
}

export const ServiceGrid = ({ isAddressLocked }: ServiceGridProps) => {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-3">
          Update Your Services
        </h2>
        <p className="text-muted-foreground">
          {isAddressLocked 
            ? "Select the services you'd like to update with your new address"
            : "Lock in your address above to start updating these services"
          }
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {serviceCategories.map((category, index) => (
          <ServiceCard
            key={category.title}
            category={category}
            isEnabled={isAddressLocked}
            delay={index * 100}
          />
        ))}
      </div>

      {isAddressLocked && (
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full">
            <div className="w-1.5 h-1.5 bg-foreground rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-muted-foreground">
              Ready to update services
            </span>
          </div>
        </div>
      )}
    </div>
  );
};