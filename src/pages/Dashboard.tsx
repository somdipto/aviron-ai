
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { User } from "@supabase/supabase-js";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Simple 3D aircraft model component (same as in InteractiveDemo)
const AircraftModel = ({ 
  aircraftType = "commercial",
  scale = 1,
  color = "#9b87f5"
}) => {
  let geometry;
  switch(aircraftType) {
    case "military":
      geometry = new THREE.ConeGeometry(1, 3, 4);
      break;
    case "vtol":
      geometry = new THREE.SphereGeometry(1, 8, 8);
      break;
    case "cargo":
      geometry = new THREE.BoxGeometry(1, 0.8, 3);
      break;
    case "private":
      geometry = new THREE.CylinderGeometry(0.5, 0.8, 3, 12);
      break;
    case "commercial":
    default:
      geometry = new THREE.CylinderGeometry(0.6, 0.8, 4, 16);
      break;
  }

  return (
    <group scale={[scale, scale, scale]}>
      <mesh>
        <primitive object={geometry} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[5, 0.1, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      <mesh position={[0, 0.5, -1.5]}>
        <boxGeometry args={[1, 1, 0.1]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
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

// Mock designs data
const mockDesigns = [
  {
    id: '1',
    name: 'Eco-Friendly Passenger Jet',
    type: 'commercial',
    description: 'A fuel-efficient wide-body passenger aircraft optimized for transatlantic flights.',
    specs: {
      fuelEfficiency: 92,
      dragCoefficient: 0.021,
      weightOptimization: 88
    },
    createdAt: '2025-05-10T10:30:00.000Z'
  },
  {
    id: '2',
    name: 'High-Speed Military Aircraft',
    type: 'military',
    description: 'Advanced stealth fighter with superior maneuverability and radar-evading technology.',
    specs: {
      fuelEfficiency: 78,
      dragCoefficient: 0.018,
      weightOptimization: 95
    },
    createdAt: '2025-05-15T14:45:00.000Z'
  },
  {
    id: '3',
    name: 'Cargo Transport Prototype',
    type: 'cargo',
    description: 'Heavy-lift cargo aircraft designed for maximum payload capacity and fuel efficiency.',
    specs: {
      fuelEfficiency: 86,
      dragCoefficient: 0.029,
      weightOptimization: 82
    },
    createdAt: '2025-05-18T09:15:00.000Z'
  }
];

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<any>({
    fullName: '',
    phoneNumber: '',
    email: ''
  });
  const [designs, setDesigns] = useState(mockDesigns);
  const [selectedDesign, setSelectedDesign] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      
      if (!data.user) {
        navigate("/");
        return;
      }
      
      setUser(data.user);
      
      // Get user profile data from metadata
      if (data.user.user_metadata) {
        setUserProfile({
          fullName: data.user.user_metadata.full_name || '',
          phoneNumber: data.user.user_metadata.phone_number || '',
          email: data.user.email
        });
      }
      
      setLoading(false);
      setSelectedDesign(mockDesigns[0]);
    };

    getUser();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "You have been signed out successfully."
    });
    navigate("/");
  };

  const handleProfileUpdate = async () => {
    if (!user) return;
    
    setProfileLoading(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: userProfile.fullName,
          phone_number: userProfile.phoneNumber
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully."
      });
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setProfileLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse space-y-4 text-center">
          <div className="h-12 w-12 mx-auto rounded-full bg-purple-600/30"></div>
          <div className="h-4 w-48 mx-auto rounded bg-purple-600/30"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main className="container mx-auto px-4 py-32">
        <div className="flex flex-col lg:flex-row justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-bold">Your Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {userProfile.fullName || user?.email}</p>
          </div>
          <Button 
            variant="outline" 
            onClick={handleSignOut}
            className="border-purple-500/30 hover:bg-purple-500/10 self-start"
          >
            Sign Out
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-1">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="space-y-6">
                <Card className="glass-card border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle>Your Profile</CardTitle>
                    <CardDescription>Manage your personal information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input 
                        id="fullName" 
                        value={userProfile.fullName} 
                        onChange={(e) => setUserProfile({...userProfile, fullName: e.target.value})}
                        className="bg-secondary/30 border-purple-500/20"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <Input 
                        id="phoneNumber" 
                        value={userProfile.phoneNumber} 
                        onChange={(e) => setUserProfile({...userProfile, phoneNumber: e.target.value})}
                        className="bg-secondary/30 border-purple-500/20"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        value={userProfile.email} 
                        disabled
                        className="bg-secondary/30 border-purple-500/20 opacity-70"
                      />
                      <p className="text-xs text-muted-foreground">Contact support to change your email address</p>
                    </div>
                    
                    <Button 
                      onClick={handleProfileUpdate} 
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      disabled={profileLoading}
                    >
                      {profileLoading ? "Updating..." : "Update Profile"}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings">
                <Card className="glass-card border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your account preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Email Notifications</h3>
                        <p className="text-sm text-muted-foreground">Receive updates about your designs</p>
                      </div>
                      <div className="relative inline-flex h-6 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none bg-purple-600">
                        <span className="inline-block h-5 w-5 transform rounded-full bg-white shadow translate-x-6"></span>
                      </div>
                    </div>
                    
                    <Separator className="bg-purple-500/20" />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Two-Factor Authentication</h3>
                        <p className="text-sm text-muted-foreground">Enable additional security for your account</p>
                      </div>
                      <Button variant="outline" className="border-purple-500/30 hover:bg-purple-500/10">Enable</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="lg:col-span-2 space-y-8">
            <Card className="glass-card border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Your Aircraft Designs</CardTitle>
                <CardDescription>View and manage your custom aircraft designs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {designs.map((design) => (
                    <Card 
                      key={design.id} 
                      className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                        selectedDesign?.id === design.id 
                          ? 'border-purple-500 shadow-lg shadow-purple-500/20' 
                          : 'border-transparent hover:shadow-md'
                      }`}
                      onClick={() => setSelectedDesign(design)}
                    >
                      <CardContent className="p-4">
                        <div className="h-16 bg-gradient-to-r from-purple-800/20 to-blue-900/20 rounded flex items-center justify-center mb-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </div>
                        <h3 className="font-semibold text-sm mb-1">{design.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {new Date(design.createdAt).toLocaleDateString()}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                  
                  <Card 
                    className="cursor-pointer border-dashed border-purple-500/30 hover:border-purple-500/60 transition-all duration-300 hover:shadow-md"
                    onClick={() => navigate("/#demo")}
                  >
                    <CardContent className="p-4 h-full flex flex-col items-center justify-center">
                      <div className="h-16 flex items-center justify-center mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-sm text-center text-purple-500/70">Create New Design</h3>
                    </CardContent>
                  </Card>
                </div>
                
                {selectedDesign && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{selectedDesign.name}</h3>
                      <p className="text-muted-foreground mb-4">{selectedDesign.description}</p>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Fuel Efficiency</span>
                            <span>{selectedDesign.specs.fuelEfficiency}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-1.5">
                            <div 
                              className="bg-purple-500 h-1.5 rounded-full" 
                              style={{ width: `${selectedDesign.specs.fuelEfficiency}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Drag Coefficient</span>
                            <span>{selectedDesign.specs.dragCoefficient}</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-1.5">
                            <div 
                              className="bg-purple-500 h-1.5 rounded-full" 
                              style={{ width: `${(1 - selectedDesign.specs.dragCoefficient) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Weight Optimization</span>
                            <span>{selectedDesign.specs.weightOptimization}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-1.5">
                            <div 
                              className="bg-purple-500 h-1.5 rounded-full" 
                              style={{ width: `${selectedDesign.specs.weightOptimization}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-3 mt-6">
                        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                          Export Design
                        </Button>
                        <Button variant="outline" className="border-purple-500/30 hover:bg-purple-500/10">
                          View Details
                        </Button>
                      </div>
                    </div>
                    
                    <div className="h-[300px] relative">
                      <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
                        <ambientLight intensity={0.5} />
                        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                        <pointLight position={[-10, -10, -10]} />
                        <AircraftModel aircraftType={selectedDesign.type} />
                        <OrbitControls enableZoom={true} />
                      </Canvas>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
