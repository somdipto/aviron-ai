
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "signin";
  
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      toast({
        title: "Welcome back!",
        description: "You've successfully signed in."
      });
      
      onClose();
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin + "/dashboard",
          data: {
            full_name: fullName,
            phone_number: phoneNumber
          }
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "Account created!",
        description: "Please check your email to confirm your registration."
      });
      
      onClose();
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md max-w-[90%] bg-transparent border-0 p-0">
        <Card className="w-full max-w-md glass-card border-0 shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Welcome to Aviron AI</CardTitle>
            <CardDescription>
              Sign in to access your AI-powered aircraft designs
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Tabs defaultValue={tab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin">
                <form onSubmit={handleSignIn}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signin-email">Email</Label>
                      <Input 
                        id="signin-email" 
                        placeholder="your.email@example.com" 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-secondary/30 border-purple-500/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signin-password">Password</Label>
                      <Input 
                        id="signin-password" 
                        type="password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-secondary/30 border-purple-500/20"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      disabled={loading}
                    >
                      {loading ? "Signing In..." : "Sign In"}
                    </Button>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignUp}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-fullname">Full Name</Label>
                      <Input 
                        id="signup-fullname" 
                        placeholder="John Doe" 
                        type="text" 
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="bg-secondary/30 border-purple-500/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-phone">Phone Number</Label>
                      <Input 
                        id="signup-phone" 
                        placeholder="+1234567890" 
                        type="tel" 
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="bg-secondary/30 border-purple-500/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input 
                        id="signup-email" 
                        placeholder="your.email@example.com" 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-secondary/30 border-purple-500/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input 
                        id="signup-password" 
                        type="password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-secondary/30 border-purple-500/20"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      disabled={loading}
                    >
                      {loading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground pt-2">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
