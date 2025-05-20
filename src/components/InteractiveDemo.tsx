
import { useState, useEffect } from "react";
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
import { supabase } from "@/integrations/supabase/client";
import AuthModal from "./AuthModal";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import * as THREE from "three";

// Simple 3D aircraft model component
const AircraftModel = ({ 
  aircraftType = "commercial",
  scale = 1,
  color = "#9b87f5"
}) => {
  // Choose geometry based on aircraftType
  let geometry;
  switch(aircraftType) {
    case "military":
      // More angular, fighter-jet like shape
      geometry = new THREE.ConeGeometry(1, 3, 4);
      break;
    case "vtol":
      // More rounded with rotors
      geometry = new THREE.SphereGeometry(1, 8, 8);
      break;
    case "cargo":
      // Larger, boxier shape
      geometry = new THREE.BoxGeometry(1, 0.8, 3);
      break;
    case "private":
      // Smaller, sleeker shape
      geometry = new THREE.CylinderGeometry(0.5, 0.8, 3, 12);
      break;
    case "commercial":
    default:
      // Standard commercial aircraft shape
      geometry = new THREE.CylinderGeometry(0.6, 0.8, 4, 16);
      break;
  }

  return (
    <group scale={[scale, scale, scale]}>
      {/* Fuselage */}
      <mesh>
        <primitive object={geometry} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Wings */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[5, 0.1, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Tail */}
      <mesh position={[0, 0.5, -1.5]}>
        <boxGeometry args={[1, 1, 0.1]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Additional details based on type */}
      {aircraftType === "military" && (
        <mesh position={[0, 0, 1]}>
          <coneGeometry args={[0.3, 0.6, 8]} />
          <meshStandardMaterial color="#ff0000" />
        </mesh>
      )}
      
      {aircraftType === "vtol" && (
        <>
          <mesh position={[1.5, 0.5, 0]}>
            <cylinderGeometry args={[0.5, 0.5, 0.1, 16]} />
            <meshStandardMaterial color="#444444" />
          </mesh>
          <mesh position={[-1.5, 0.5, 0]}>
            <cylinderGeometry args={[0.5, 0.5, 0.1, 16]} />
            <meshStandardMaterial color="#444444" />
          </mesh>
        </>
      )}
    </group>
  );
};

const InteractiveDemo = () => {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [aircraftType, setAircraftType] = useState("commercial");
  const [passengers, setPassengers] = useState("150");
  const [range, setRange] = useState([5000]);
  const [priority, setPriority] = useState("efficiency");
  const [user, setUser] = useState<any>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [generatedDesign, setGeneratedDesign] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Check authentication state
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  const handleGenerate = () => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    
    setLoading(true);
    
    // Simulate AI design generation
    setTimeout(() => {
      setLoading(false);
      setGeneratedDesign(true);
      toast({
        title: "Design Generated",
        description: "Your aircraft design has been created successfully.",
      });
    }, 2000);
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Input Form */}
          <Card className="glass-card border-0 shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
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
                <Select value={aircraftType} onValueChange={setAircraftType}>
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
                <Input 
                  id="passengers" 
                  type="number" 
                  value={passengers} 
                  onChange={(e) => setPassengers(e.target.value)} 
                  className="bg-secondary/30 border-purple-500/20" 
                />
              </div>
              
              <div className="space-y-2">
                <Label>Range (km)</Label>
                <div className="pt-4">
                  <Slider 
                    value={range} 
                    onValueChange={setRange} 
                    max={20000} 
                    step={100} 
                    className="[&>span]:bg-purple-500" 
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-gray-400">0 km</span>
                    <span className="text-xs text-gray-400">{range[0].toLocaleString()} km</span>
                    <span className="text-xs text-gray-400">20,000 km</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="priority">Design Priority</Label>
                <Select value={priority} onValueChange={setPriority}>
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

          {/* 3D Aircraft Display for authenticated users who have generated a design */}
          {user && generatedDesign ? (
            <Card className="glass-card border-0 shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 h-full">
              <CardHeader>
                <CardTitle>Your Aircraft Design</CardTitle>
                <CardDescription>3D visualization of your specifications</CardDescription>
              </CardHeader>
              <CardContent className="h-[450px]">
                <div className="w-full h-full relative">
                  <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <pointLight position={[-10, -10, -10]} />
                    <AircraftModel aircraftType={aircraftType} />
                    <OrbitControls enableZoom={true} />
                  </Canvas>
                  
                  <div className="absolute bottom-4 left-4 right-4 glass p-4 rounded-lg">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Fuel Efficiency</span>
                      <span>92%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5 mb-3">
                      <div className="bg-purple-500 h-1.5 rounded-full w-[92%]"></div>
                    </div>
                    
                    <div className="flex justify-between text-sm mb-1">
                      <span>Drag Coefficient</span>
                      <span>0.021</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5 mb-3">
                      <div className="bg-purple-500 h-1.5 rounded-full w-[85%]"></div>
                    </div>
                    
                    <div className="flex justify-between text-sm mb-1">
                      <span>Weight Optimization</span>
                      <span>88%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                      <div className="bg-purple-500 h-1.5 rounded-full w-[88%]"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="glass-card border-0 shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 flex flex-col justify-center items-center p-8">
              <div className="text-center">
                <div className="relative w-40 h-40 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full animate-pulse"></div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full text-purple-500/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Design Preview</h3>
                <p className="text-gray-400 mb-6">
                  {user 
                    ? "Enter your specifications and click 'Generate Design' to see your custom aircraft."
                    : "Sign in or create an account to generate and view your custom aircraft design."}
                </p>
                {!user && (
                  <Button
                    onClick={() => setAuthModalOpen(true)}
                    variant="outline"
                    className="border-purple-500/30 hover:bg-purple-500/10"
                  >
                    Sign In to Continue
                  </Button>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </section>
  );
};

export default InteractiveDemo;
