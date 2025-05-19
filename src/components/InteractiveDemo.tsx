
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

const InteractiveDemo = () => {
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  
  const handleGenerate = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setGenerated(true);
    }, 2000);
  };

  return (
    <section id="demo" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-blue-950/10"></div>
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Try Our <span className="text-gradient">AI Aircraft Designer</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Input your specifications and watch our AI generate a custom aircraft design in seconds.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Input Form */}
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle>Design Parameters</CardTitle>
              <CardDescription>Define your aircraft requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="aircraft-type">Aircraft Type</Label>
                <Select defaultValue="commercial">
                  <SelectTrigger id="aircraft-type">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
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
                <Input id="passengers" type="number" defaultValue="150" />
              </div>
              
              <div className="space-y-2">
                <Label>Range (km)</Label>
                <div className="pt-4">
                  <Slider defaultValue={[5000]} max={20000} step={100} />
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
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select Priority" />
                  </SelectTrigger>
                  <SelectContent>
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
                className="w-full"
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
          
          {/* Result Visualization */}
          <Card className="glass-card border-0 overflow-hidden">
            <CardHeader>
              <CardTitle>Design Preview</CardTitle>
              <CardDescription>Generated based on your specifications</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center relative">
              {generated ? (
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-700/10 to-blue-900/30 flex items-center justify-center">
                    <div className="glow p-4 rounded-2xl">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-48 w-48 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 right-4 glass p-4 rounded-lg">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Fuel Efficiency</span>
                      <span>92%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5 mb-3">
                      <div className="bg-blue-500 h-1.5 rounded-full w-[92%]"></div>
                    </div>
                    
                    <div className="flex justify-between text-sm mb-1">
                      <span>Drag Coefficient</span>
                      <span>0.021</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5 mb-3">
                      <div className="bg-blue-500 h-1.5 rounded-full w-[85%]"></div>
                    </div>
                    
                    <div className="flex justify-between text-sm mb-1">
                      <span>Weight Optimization</span>
                      <span>88%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                      <div className="bg-blue-500 h-1.5 rounded-full w-[88%]"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <p>Set parameters and generate a design</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;
