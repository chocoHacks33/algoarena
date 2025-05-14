
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would connect to an authentication service
    if (isLogin) {
      // Mock login logic
      if (formData.email && formData.password) {
        localStorage.setItem("user", JSON.stringify({ email: formData.email }));
        toast({
          title: "Successfully logged in",
          description: "Welcome back to Debate.io"
        });
        navigate("/interests");
      }
    } else {
      // Mock register logic
      if (formData.email && formData.password && formData.username) {
        localStorage.setItem("user", JSON.stringify({ email: formData.email, username: formData.username }));
        toast({
          title: "Account created",
          description: "Welcome to Debate.io"
        });
        navigate("/interests");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md bg-card border-border">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-6">
            <h1 className="text-4xl font-bold text-primary bg-clip-text">Debate.io</h1>
          </div>
          <CardTitle className="text-2xl font-bold">{isLogin ? "Sign In" : "Create an Account"}</CardTitle>
          <CardDescription>
            {isLogin ? "Enter your credentials to access your account" : "Enter your information to create an account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  name="username" 
                  placeholder="username" 
                  value={formData.username}
                  onChange={handleChange}
                  required 
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="m@example.com"
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                name="password"
                type="password" 
                placeholder="••••••••" 
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button className="w-full mb-4" onClick={handleSubmit}>
            {isLogin ? "Sign In" : "Create Account"}
          </Button>
          <Button 
            variant="ghost" 
            className="w-full"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
