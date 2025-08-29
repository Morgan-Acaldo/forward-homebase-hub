import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Zap, 
  Bot,
  Check,
  ArrowRight,
  Clock,
  Users,
  Shield,
  Sparkles,
  Target,
  Workflow,
  Mail,
  Phone
} from "lucide-react";

const Services = () => {
  const [selectedTier, setSelectedTier] = useState("tier2");

  const serviceTiers = [
    {
      id: "tier1",
      name: "Form Generation",
      tier: "Tier 1",
      price: "$9 one time",
      description: "Generate address change forms and letters for manual submission",
      icon: <FileText className="w-8 h-8" />,
      color: "bg-blue-500",
      features: [
        "Pre-filled PDF forms for 50+ services",
        "Professional letter templates",
        "Download and print capability",
        "Basic form validation",
        "Standard document formats",
        "Email delivery of documents"
      ],
      idealFor: "DIY users who prefer to handle submissions themselves",
      timeCommitment: "2-3 hours per address change",
      support: "Community support & documentation"
    },
    {
      id: "tier2", 
      name: "Guided Automation",
      tier: "Tier 2",
      price: "$19 one time",
      description: "Hybrid automation with guided assistance for complex services",
      icon: <Zap className="w-8 h-8" />,
      color: "bg-primary",
      popular: true,
      features: [
        "Everything in Tier 1",
        "Automated form submission for 30+ services",
        "Step-by-step guidance for complex cases",
        "Real-time submission tracking",
        "Email notifications and confirmations",
        "Priority customer support",
        "Retry failed submissions automatically"
      ],
      idealFor: "Users who want automation with peace of mind",
      timeCommitment: "30-45 minutes per address change",
      support: "Email support with 24-hour response"
    },
    {
      id: "tier3",
      name: "Full Automation", 
      tier: "Tier 3",
      price: "$49/month",
      description: "Complete hands-off automation for frequent movers or businesses",
      icon: <Bot className="w-8 h-8" />,
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      features: [
        "Everything in Tier 1 & 2",
        "100% automated submissions",
        "AI-powered form completion",
        "Phone call automation for complex services",
        "White-glove concierge service",
        "Guaranteed completion within 5 business days",
        "Dedicated account manager",
        "Premium 24/7 phone support"
      ],
      idealFor: "Busy professionals and frequent movers",
      timeCommitment: "5 minutes setup, then hands-off",
      support: "Dedicated account manager & 24/7 phone support"
    }
  ];

  const comparisonFeatures = [
    { feature: "PDF Form Generation", tier1: true, tier2: true, tier3: true },
    { feature: "Professional Letter Templates", tier1: true, tier2: true, tier3: true },
    { feature: "Automated Form Submission", tier1: false, tier2: true, tier3: true },
    { feature: "Real-time Tracking", tier1: false, tier2: true, tier3: true },
    { feature: "Phone Call Automation", tier1: false, tier2: false, tier3: true },
    { feature: "Guaranteed Completion", tier1: false, tier2: false, tier3: true },
    { feature: "Dedicated Account Manager", tier1: false, tier2: false, tier3: true },
    { feature: "24/7 Phone Support", tier1: false, tier2: false, tier3: true }
  ];

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
                <a href="/services" className="text-sm font-medium text-foreground border-b-2 border-primary pb-1">Services</a>
                <a href="/documents" className="text-sm text-muted-foreground hover:text-foreground">Documents</a>
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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Choose Your Service Level</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From DIY form generation to complete automation, we have the perfect solution for your address change needs
          </p>
        </div>

        {/* Service Tier Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {serviceTiers.map((tier) => (
            <Card 
              key={tier.id} 
              className={`border-border relative transition-all duration-300 hover:shadow-lg ${
                tier.popular ? 'ring-2 ring-primary scale-105' : ''
              } ${selectedTier === tier.id ? 'ring-2 ring-primary' : ''}`}
              onClick={() => setSelectedTier(tier.id)}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-white px-4 py-1">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className={`p-4 rounded-full text-white ${tier.color}`}>
                    {tier.icon}
                  </div>
                </div>
                <div className="mb-2">
                  <Badge variant="outline" className="text-xs mb-2">{tier.tier}</Badge>
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {tier.price}
                  {tier.price.includes("/month") && <span className="text-lg text-muted-foreground"> - Frequent movers or businesses</span>}
                </div>
                <CardDescription className="text-center">{tier.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {tier.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-success mt-1 flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3 pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Ideal for: {tier.idealFor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Time: {tier.timeCommitment}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Support: {tier.support}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full" 
                  variant={tier.popular ? "default" : "outline"}
                  size="lg"
                >
                  {tier.price.includes("one time") ? "One-Time Purchase" : "Choose Plan"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <Card className="border-border mb-12">
          <CardHeader>
            <CardTitle className="text-center">Feature Comparison</CardTitle>
            <CardDescription className="text-center">
              See what's included in each service tier
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 font-medium text-foreground">Feature</th>
                    <th className="text-center py-4 px-4 font-medium text-foreground">Tier 1</th>
                    <th className="text-center py-4 px-4 font-medium text-foreground">Tier 2</th>
                    <th className="text-center py-4 px-4 font-medium text-foreground">Tier 3</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((item, index) => (
                    <tr key={index} className="border-b border-border/50">
                      <td className="py-3 px-4 text-foreground">{item.feature}</td>
                      <td className="py-3 px-4 text-center">
                        {item.tier1 ? (
                          <Check className="w-5 h-5 text-success mx-auto" />
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {item.tier2 ? (
                          <Check className="w-5 h-5 text-success mx-auto" />
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {item.tier3 ? (
                          <Check className="w-5 h-5 text-success mx-auto" />
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card className="border-border mb-12">
          <CardHeader className="text-center">
            <CardTitle>How Forward Works</CardTitle>
            <CardDescription>Our streamlined process makes address changes simple</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  step: "1",
                  title: "Enter Address",
                  description: "Input your new address and verify details",
                  icon: <Target className="w-6 h-6" />
                },
                {
                  step: "2", 
                  title: "Select Services",
                  description: "Choose which services need address updates",
                  icon: <Workflow className="w-6 h-6" />
                },
                {
                  step: "3",
                  title: "Choose Automation",
                  description: "Pick your preferred service tier",
                  icon: <Bot className="w-6 h-6" />
                },
                {
                  step: "4",
                  title: "Relax & Track",
                  description: "Monitor progress and receive confirmations",
                  icon: <Shield className="w-6 h-6" />
                }
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                        {step.icon}
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {step.step}
                      </div>
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="border-border bg-primary/5">
            <CardContent className="py-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of users who have simplified their address changes with Forward
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8">
                  <Phone className="w-5 h-5 mr-2" />
                  Schedule Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Services;