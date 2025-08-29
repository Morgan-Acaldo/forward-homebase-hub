import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Search, 
  MessageCircle, 
  Mail, 
  Phone, 
  Clock,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Send,
  BookOpen,
  Video,
  FileText
} from "lucide-react";

const Support = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("general");

  const faqCategories = [
    { id: "general", label: "General Questions", icon: <HelpCircle className="w-4 h-4" /> },
    { id: "address", label: "Address Changes", icon: <FileText className="w-4 h-4" /> },
    { id: "documents", label: "Documents", icon: <BookOpen className="w-4 h-4" /> },
    { id: "billing", label: "Billing & Account", icon: <AlertCircle className="w-4 h-4" /> }
  ];

  const faqs = [
    {
      category: "general",
      question: "How does Forward work?",
      answer: "Forward automates the process of updating your address across all your services. Simply enter your new address, select the services you want to update, and we'll handle the rest by generating the necessary forms and letters."
    },
    {
      category: "general", 
      question: "Is my personal information secure?",
      answer: "Yes, we use bank-level encryption to protect your data. Your information is never shared with third parties and is only used to generate the necessary address change documents."
    },
    {
      category: "address",
      question: "What if I need to update my address again?",
      answer: "You can update your address as many times as needed. Simply return to the dashboard, enter your new address, and select the services you want to update."
    },
    {
      category: "address",
      question: "How long does it take for address changes to take effect?",
      answer: "This depends on each individual service provider. Most updates are processed within 5-10 business days, though some may take longer."
    },
    {
      category: "documents",
      question: "Can I download my submitted forms?",
      answer: "Yes, all generated forms and letters are available in your Documents page. You can download them anytime for your records."
    },
    {
      category: "documents",
      question: "What format are the documents in?",
      answer: "All documents are generated as PDF files, making them easy to save, print, or email as needed."
    },
    {
      category: "billing",
      question: "How much does Forward cost?",
      answer: "Forward offers both free and premium plans. The free plan includes basic address changes, while premium plans offer additional features like priority processing and phone support."
    },
    {
      category: "billing",
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your billing period."
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.category === selectedCategory && 
    (faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
     faq.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const supportOptions = [
    {
      title: "Live Chat",
      description: "Get instant help from our support team",
      icon: <MessageCircle className="w-6 h-6" />,
      status: "Available now",
      statusColor: "bg-success/10 text-success",
      action: "Start Chat"
    },
    {
      title: "Email Support", 
      description: "Send us a detailed message",
      icon: <Mail className="w-6 h-6" />,
      status: "Response within 24h",
      statusColor: "bg-primary/10 text-primary",
      action: "Send Email"
    },
    {
      title: "Phone Support",
      description: "Speak directly with our team",
      icon: <Phone className="w-6 h-6" />,
      status: "Mon-Fri 9AM-6PM EST",
      statusColor: "bg-warning/10 text-warning",
      action: "Call Now"
    }
  ];

  const helpResources = [
    {
      title: "Getting Started Guide",
      description: "Learn the basics of using Forward",
      icon: <BookOpen className="w-5 h-5" />,
      type: "Article"
    },
    {
      title: "Video Tutorials",
      description: "Watch step-by-step video guides",
      icon: <Video className="w-5 h-5" />,
      type: "Video"
    },
    {
      title: "Service Integration Guide",
      description: "How to connect your services",
      icon: <FileText className="w-5 h-5" />,
      type: "Guide"
    }
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
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Services</a>
                <a href="/documents" className="text-sm text-muted-foreground hover:text-foreground">Documents</a>
                <a href="/support" className="text-sm font-medium text-foreground border-b-2 border-primary pb-1">Support</a>
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Support Center</h1>
          <p className="text-muted-foreground">Get help and find answers to your questions</p>
        </div>

        {/* Support Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {supportOptions.map((option, index) => (
            <Card key={index} className="border-border hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {option.icon}
                  </div>
                  <CardTitle className="text-lg">{option.title}</CardTitle>
                </div>
                <CardDescription>{option.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge className={`text-xs ${option.statusColor}`}>
                    {option.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    {option.action}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>Find quick answers to common questions</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Search */}
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search FAQs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {faqCategories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className="text-xs"
                    >
                      {category.icon}
                      <span className="ml-1">{category.label}</span>
                    </Button>
                  ))}
                </div>

                {/* FAQ List */}
                <Accordion type="single" collapsible className="space-y-2">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg px-4">
                      <AccordionTrigger className="text-left hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                {filteredFaqs.length === 0 && (
                  <div className="text-center py-8">
                    <Search className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No FAQs found</h3>
                    <p className="text-muted-foreground">Try adjusting your search or category</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Help Resources */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Help Resources</CardTitle>
                <CardDescription>Guides and tutorials to get you started</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {helpResources.map((resource, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        {resource.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-foreground">{resource.title}</h4>
                        <p className="text-xs text-muted-foreground">{resource.description}</p>
                        <Badge variant="outline" className="text-xs mt-1">
                          {resource.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Send us a message</CardTitle>
                <CardDescription>Can't find what you're looking for?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input placeholder="Subject" />
                  <Textarea placeholder="Describe your issue or question..." rows={4} />
                  <Button className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Status */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">All Systems</span>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-sm text-success">Operational</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">API Services</span>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-sm text-success">Operational</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Document Generation</span>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-sm text-success">Operational</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Support;