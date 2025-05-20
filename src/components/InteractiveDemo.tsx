
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Slider 
} from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const InteractiveDemo = () => {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleGenerate = () => {
    setLoading(true);
    
    // Simulate API call then redirect to authentication
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Authentication required",
        description: "Please log in to view your generated aircraft design",
      });
      navigate("/auth");
    }, 1000);
  };

  return (
    <section id="demo" className="py-20 relative overflow-hidden">
      {/* Background with fewer dots */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-purple-950/20"></div>
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute left-1/4 top-1/4 w-3 h-3 rounded-full bg-purple-500/40 animate-float" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute left-3/4 top-1/3 w-2 h-2 rounded-full bg-blue-500/40 animate-float" style={{ animationDelay: '1.2s' }}></div>
      <div className="absolute left-1/3 bottom-1/4 w-4 h-4 rounded-full bg-purple-500/30 animate-float" style={{ animationDelay: '1.8s' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Try Our <span className="text-gradient">AI Aircraft Designer</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Input your specifications and watch our AI generate a custom aircraft design in seconds.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-10">
          {/* Input Form */}
          <Card className="glass-card border-0 max-w-4xl mx-auto shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
            <CardHeader>
              <CardTitle>Design Parameters</CardTitle>
              <CardDescription>Define your aircraft requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="prompt">How would you like your aircraft to be?</Label>
                <Textarea 
                  id="prompt" 
                  placeholder="Describe your ideal aircraft. E.g., 'A fuel-efficient passenger jet with extended range, focusing on sustainable materials and aerodynamic excellence...'" 
                  className="bg-secondary/30 min-h-24 resize-none border-purple-500/20 focus:border-purple-500/50"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="aircraft-type">Aircraft Type</Label>
                <Select defaultValue="commercial">
                  <SelectTrigger id="aircraft-type" className="bg-secondary/30 border-purple-500/20">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-purple-500/20 backdrop-blur-md">
                    <SelectItem value="commercial">Commercial Passenger</SelectItem>
                    <SelectItem value="cargo">Cargo</SelectItem>
                    <SelectItem value="private">Private Jet</SelectItem>
                    <SelectItem value="military">Military</SelectItem>
                    <SelectItem value="vtol">VTOL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="passengers">Passenger Capacity</Label>
                <Input id="passengers" type="number" defaultValue="150" className="bg-secondary/30 border-purple-500/20" />
              </div>
              
              <div className="space-y-2">
                <Label>Range (km)</Label>
                <div className="pt-4">
                  <Slider defaultValue={[5000]} max={20000} step={100} className="[&>span]:bg-purple-500" />
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-gray-400">0 km</span>
                    <span className="text-xs text-gray-400">5,000 km</span>
                    <span className="text-xs text-gray-400">20,000 km</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="priority">Design Priority</Label>
                <Select defaultValue="efficiency">
                  <SelectTrigger id="priority" className="bg-secondary/30 border-purple-500/20">
                    <SelectValue placeholder="Select Priority" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-purple-500/20 backdrop-blur-md">
                    <SelectItem value="efficiency">Fuel Efficiency</SelectItem>
                    <SelectItem value="speed">Maximum Speed</SelectItem>
                    <SelectItem value="capacity">Maximum Capacity</SelectItem>
                    <SelectItem value="cost">Cost Effectiveness</SelectItem>
                    <SelectItem value="sustainability">Sustainability</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                onClick={handleGenerate} 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </div>
                ) : "Generate Design"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;
