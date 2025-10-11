import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useAuth } from "@/lib/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Header } from "@/components/shared/Header";
import { ChefHat, Check, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function Signup() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signup, confirmSignup } = useAuth();

  // Step control
  const [step, setStep] = useState<'form' | 'confirm'>('form');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const nextUrl = searchParams.get("next") || "/onboarding";

  const passwordRequirements = [
    { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
    { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
    { label: "One lowercase letter", test: (p: string) => /[a-z]/.test(p) },
    { label: "One number", test: (p: string) => /\d/.test(p) },
  ];

  const passwordStrength = passwordRequirements.filter(req => req.test(password)).length;
  const strengthPercentage = (passwordStrength / passwordRequirements.length) * 100;

  const handleSignup = async (e: React.FormEvent) => {
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
      toast.success("Account created! Please check your email for verification code.");
      setStep("confirm");
    } catch (error: any) {
      toast.error(error.message || "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await confirmSignup(email, code);
      toast.success("Email confirmed! You can now log in.");
      navigate(`/login?next=${nextUrl}`);
    } catch (error: any) {
      toast.error(error.message || "Invalid confirmation code");
    } finally {
      setIsLoading(false);
    }
  };

  // --- Step 1: Sign-up Form ---
  if (step === 'form') {
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

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Sign up with email
                </span>
              </div>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required disabled={isLoading} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={isLoading} />
                {password && (
                  <div className="space-y-2 mt-2">
                    <Progress value={strengthPercentage} className="h-2" />
                    {passwordRequirements.map((req, i) => (
                      <div key={i} className={cn("flex items-center gap-2 text-xs", req.test(password) ? "text-secondary" : "text-muted-foreground")}>
                        {req.test(password) ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                        <span>{req.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required disabled={isLoading} />
              </div>

              <Button type="submit" className="w-full btn-scale" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Sign Up"}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to={`/login${nextUrl !== "/onboarding" ? `?next=${encodeURIComponent(nextUrl)}` : ""}`} className="text-primary hover:underline font-medium">
                Log in
              </Link>
            </p>
          </Card>
        </main>
      </div>
    );
  }

  // --- Step 2: Confirmation Code ---
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md p-8 glass animate-scale-in">
          <h1 className="text-2xl font-bold text-center mb-4">Verify Your Email</h1>
          <p className="text-center text-muted-foreground mb-6">
            We’ve sent a 6-digit code to <strong>{email}</strong>
          </p>

          <form onSubmit={handleConfirm} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Verification Code</Label>
              <Input id="code" type="text" value={code} onChange={(e) => setCode(e.target.value)} required disabled={isLoading} />
            </div>

            <Button type="submit" className="w-full btn-scale" disabled={isLoading}>
              {isLoading ? "Verifying..." : "Confirm"}
            </Button>
          </form>
        </Card>
      </main>
    </div>
  );
}