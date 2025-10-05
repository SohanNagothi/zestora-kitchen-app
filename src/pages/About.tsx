/* PAGE: /about */
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Card } from "@/components/ui/card";
import { ChefHat, Target, Users, Heart } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To make cooking accessible and enjoyable for everyone by transforming everyday ingredients into extraordinary meals.",
    },
    {
      icon: Users,
      title: "Community First",
      description: "We believe in the power of community. Share recipes, learn from others, and grow together in your culinary journey.",
    },
    {
      icon: Heart,
      title: "Health & Safety",
      description: "Your well-being matters. We ensure every recipe respects dietary restrictions and allergies.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-primary mb-6">
              <ChefHat className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              About Zestora
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're on a mission to help you cook smart with what you have,
              reducing food waste while creating delicious meals.
            </p>
          </div>

          {/* Story */}
          <Card className="glass p-8 mb-12">
            <h2 className="text-2xl font-heading font-semibold mb-4">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Zestora was born from a simple observation: millions of people struggle
                with meal planning and often waste ingredients they already have at home.
                We wanted to create a solution that's both intelligent and accessible.
              </p>
              <p>
                Using cutting-edge AI technology, we've built a platform that understands
                your pantry, respects your dietary needs, and suggests recipes that are
                not just possible, but delicious.
              </p>
              <p>
                Today, Zestora serves thousands of home cooks worldwide, helping them
                discover new recipes, reduce food waste, and most importantly, enjoy
                the art of cooking.
              </p>
            </div>
          </Card>

          {/* Values */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {values.map((value, index) => (
              <Card key={index} className="glass p-6 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-primary mb-4">
                  <value.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-heading font-semibold mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>

          {/* Team */}
          <Card className="glass p-8">
            <h2 className="text-2xl font-heading font-semibold mb-4">Based in Mumbai</h2>
            <p className="text-muted-foreground mb-6">
              Zestora Labs is proudly based in the heart of Mumbai, India. We're a team
              of food enthusiasts, technologists, and designers working together to
              revolutionize home cooking.
            </p>
            <div className="text-sm text-muted-foreground">
              <p className="font-medium">Zestora Labs</p>
              <p>12A, Marine Lines</p>
              <p>Mumbai 400020, India</p>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
