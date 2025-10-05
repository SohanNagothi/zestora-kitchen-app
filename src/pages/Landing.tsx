/* PAGE: / */
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { ChefHat, Sparkles, Shield, Users, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import heroImage from "@/assets/hero-image.jpg";

export default function Landing() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [demoIngredients, setDemoIngredients] = useState("");

  const features = [
    {
      icon: ChefHat,
      title: "Ingredient-Based Generation",
      description: "Simply enter what's in your pantry and get personalized recipe suggestions instantly.",
    },
    {
      icon: Shield,
      title: "Allergy-Aware",
      description: "Set your dietary restrictions and allergies - we'll make sure every recipe is safe for you.",
    },
    {
      icon: Users,
      title: "Community Uploads",
      description: "Share your own recipes with the community and discover unique dishes from fellow cooks.",
    },
  ];

  const handleDemoTry = () => {
    if (demoIngredients.trim()) {
      navigate(`/generate?demo=${encodeURIComponent(demoIngredients)}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero pt-20 pb-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight">
                Cook Smart with{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  What You Have
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl">
                Transform your pantry into delicious meals. AI-powered recipe generation
                based on your ingredients, allergies, and taste preferences.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="text-lg px-8 btn-scale"
                  onClick={() => navigate(isAuthenticated ? "/generate" : "/signup")}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8"
                  onClick={() => {
                    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Learn More
                </Button>
              </div>

              {/* Quick Demo Input */}
              <Card className="glass p-4 mt-8">
                <p className="text-sm font-medium mb-3">Try a quick sample:</p>
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g., chicken, rice, tomatoes"
                    value={demoIngredients}
                    onChange={(e) => setDemoIngredients(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleDemoTry()}
                    className="flex-1"
                  />
                  <Button onClick={handleDemoTry} className="btn-scale">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Try Sample
                  </Button>
                </div>
              </Card>
            </div>

            {/* Right: Hero Image */}
            <div className="relative animate-scale-in">
              <div className="relative rounded-3xl overflow-hidden shadow-strong">
                <img
                  src={heroImage}
                  alt="Fresh ingredients"
                  className="w-full h-auto"
                />
              </div>
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 glass rounded-2xl p-4 animate-float">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-secondary animate-pulse" />
                  <span className="text-sm font-medium">AI-Powered</span>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 glass rounded-2xl p-4 animate-float" style={{ animationDelay: "1s" }}>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-primary animate-pulse" />
                  <span className="text-sm font-medium">10,000+ Recipes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-heading font-bold">
              Why Choose Zestora?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our intelligent platform makes cooking easier, safer, and more creative
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="glass p-8 card-hover animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="rounded-2xl bg-gradient-primary p-4 w-fit mb-6">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-heading font-semibold mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <Card className="glass p-12 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-heading font-bold mb-6">
              Ready to Start Cooking?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of home cooks who are already making the most of their ingredients
            </p>
            <Button
              size="lg"
              className="text-lg px-12 btn-scale"
              onClick={() => navigate(isAuthenticated ? "/generate" : "/signup")}
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
