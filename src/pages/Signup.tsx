/* PAGE: /signup */
import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useAuth } from "@/lib/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Header } from "@/components/shared/Header";
import { ChefHat, Chrome, Apple, Check, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function Signup() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signup, socialLogin } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const nextUrl = searchParams.get("next") || "/onboarding";

  // Password strength
  const passwordRequirements = [
    { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
    { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
    { label: "One lowercase letter", test: (p: string) => /[a-z]/.test(p) },
    { label: "One number", test: (p: string) => /\d/.test(p) },
  ];

  const passwordStrength = passwordRequirements.filter(req => req.test(password)).length;
  const strengthPercentage = (passwordStrength / passwordRequirements.length) * 100;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    if (passwordStrength < passwordRequirements.length) {
      toast.error("Please meet all password requirements");
      return;
    }

    setIsLoading(true);

    try {
      await signup(name, email, password);
      toast.success("Account created successfully!");
      navigate(nextUrl);
    } catch (error) {
      toast.error("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'apple') => {
    setIsLoading(true);
    try {
      await socialLogin(provider);
      toast.success(`Signed up with ${provider}!`);
      navigate(nextUrl);
    } catch (error) {
      toast.error(`Failed to sign up with ${provider}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md p-8 glass animate-scale-in">
          <div className="flex justify-center mb-6">
            <div className="rounded-2xl bg-gradient-primary p-4">
              <ChefHat className="h-10 w-10 text-white" />
            </div>
          </div>

          <h1 className="text-3xl font-heading font-bold text-center mb-2">
            Create Account
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            Start your cooking journey today
          </p>

          {/* Social Signup */}
          <div className="space-y-3 mb-6">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleSocialLogin('google')}
              disabled={isLoading}
            >
              <Chrome className="mr-2 h-5 w-5" />
              Sign up with Google
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleSocialLogin('apple')}
              disabled={isLoading}
            >
              <Apple className="mr-2 h-5 w-5" />
              Sign up with Apple
            </Button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or sign up with email
              </span>
            </div>
          </div>

          {/* Email Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
              {password && (
                <div className="space-y-2 mt-2">
                  <Progress value={strengthPercentage} className="h-2" />
                  <div className="space-y-1">
                    {passwordRequirements.map((req, i) => (
                      <div
                        key={i}
                        className={cn(
                          "flex items-center gap-2 text-xs",
                          req.test(password) ? "text-secondary" : "text-muted-foreground"
                        )}
                      >
                        {req.test(password) ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <X className="h-3 w-3" />
                        )}
                        <span>{req.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              className="w-full btn-scale"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to={`/login${nextUrl !== "/onboarding" ? `?next=${encodeURIComponent(nextUrl)}` : ""}`}
              className="text-primary hover:underline font-medium"
            >
              Log in
            </Link>
          </p>
        </Card>
      </main>
    </div>
  );
}
