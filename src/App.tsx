
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import AboutUs from "./pages/AboutUs";
import Technology from "./pages/Technology";
import Contact from "./pages/Contact";
import PageTemplate from "./components/PageTemplate";

const queryClient = new QueryClient();

// Create simple page templates for footer links
const SimplePageTemplate = ({ title, description }: { title: string, description: string }) => (
  <PageTemplate title={title} description={description}>
    <p>This page is currently under development. Check back soon for updates.</p>
  </PageTemplate>
);

const AIModel = () => <SimplePageTemplate title="AI Model" description="Learn about our advanced AI modeling technology" />;
const Integrations = () => <SimplePageTemplate title="Integrations" description="Connect Aviron AI with your existing tools and workflows" />;
const Careers = () => <SimplePageTemplate title="Careers" description="Join our team and help shape the future of aircraft design" />;
const Blog = () => <SimplePageTemplate title="Blog" description="Insights and updates from the Aviron AI team" />;
const Press = () => <SimplePageTemplate title="Press" description="News and media resources" />;
const Documentation = () => <SimplePageTemplate title="Documentation" description="Comprehensive guides for using the Aviron AI platform" />;
const APIReference = () => <SimplePageTemplate title="API Reference" description="Technical documentation for developers" />;
const Tutorials = () => <SimplePageTemplate title="Tutorials" description="Step-by-step guides to get the most out of Aviron AI" />;
const Support = () => <SimplePageTemplate title="Support" description="Get help with your Aviron AI account" />;
const Community = () => <SimplePageTemplate title="Community" description="Join the Aviron AI community" />;
const Privacy = () => <SimplePageTemplate title="Privacy Policy" description="How we handle your data" />;
const Terms = () => <SimplePageTemplate title="Terms of Service" description="Legal terms for using Aviron AI" />;
const Cookies = () => <SimplePageTemplate title="Cookie Policy" description="How we use cookies on our website" />;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/ai-model" element={<AIModel />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/press" element={<Press />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/api" element={<APIReference />} />
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path="/support" element={<Support />} />
          <Route path="/community" element={<Community />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
