/* PAGE: /recipe/:id */
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import {
  Clock,
  Users,
  Heart,
  Download,
  Share2,
  Flag,
  Check,
} from "lucide-react";
import { Recipe } from "@/data/mockRecipes";
import { toast } from "sonner";

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    // If recipe is passed via state
    if (location.state?.recipe) {
      setRecipe(location.state.recipe);
      return;
    }

    // Fallback: search in mockRecipes
    import("@/data/mockRecipes").then(({ mockRecipes }) => {
      const found = mockRecipes.find((r) => r.id === id);
      if (found) {
        setRecipe(found);
      } else {
        toast.error("Recipe not found");
        navigate("/explore");
      }
    });
  }, [id, location.state, navigate]);

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    );
  }

  const toggleStep = (index: number) => {
    setCompletedSteps((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast.success(isSaved ? "Removed from saved recipes" : "Saved to your recipes");
  };

  const handleDownloadShoppingList = () => {
    const content = recipe.ingredients
      .map(
        (i) =>
          `${i.name} - ${i.quantity}${i.unit ? " " + i.unit : ""}`
      )
      .join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${recipe.title}-shopping-list.txt`;
    link.click();
    toast.success("Shopping list downloaded!");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: `Check out this recipe: ${recipe.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Image */}
        <div className="relative h-96 overflow-hidden">
          <motion.img
            src={recipe.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=800&fit=crop"}
            alt={recipe.title}
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        <div className="container mx-auto px-4 -mt-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-8 shadow-strong mb-8"
          >
            {/* Title & Badges */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">{recipe.cuisine}</Badge>
                {recipe.allergens.length === 0 && (
                  <Badge variant="outline">Allergen-Free</Badge>
                )}
                {recipe.allergens.map((allergen) => (
                  <Badge key={allergen} variant="destructive">
                    No {allergen}
                  </Badge>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                {recipe.title}
              </h1>
              <div className="flex flex-wrap gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{recipe.cookTime} mins</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>{recipe.servings} servings</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">⭐</span>
                  <span>{recipe.rating}/5</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-8 pb-8 border-b">
              <Button
                onClick={handleSave}
                className={`btn-scale ${isSaved ? "bg-primary" : ""}`}
              >
                <Heart className={`mr-2 h-5 w-5 ${isSaved ? "fill-current" : ""}`} />
                {isSaved ? "Saved" : "Save"}
              </Button>
              <Button
                onClick={handleDownloadShoppingList}
                variant="outline"
                className="btn-scale"
              >
                <Download className="mr-2 h-5 w-5" />
                Shopping List
              </Button>
              <Button
                onClick={handleShare}
                variant="outline"
                className="btn-scale"
              >
                <Share2 className="mr-2 h-5 w-5" />
                Share
              </Button>
              <Button variant="ghost" className="ml-auto">
                <Flag className="mr-2 h-5 w-5" />
                Report
              </Button>
            </div>

            {/* Ingredients */}
            <div className="mb-8">
              <h2 className="text-2xl font-heading font-semibold mb-4">
                Ingredients
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {recipe.ingredients.map((ingredient, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <Checkbox id={`ingredient-${i}`} />
                    <label htmlFor={`ingredient-${i}`} className="flex-1 cursor-pointer">
                      <span className="font-medium">{ingredient.name}</span>
                      {ingredient.quantity && (
                        <span className="text-muted-foreground ml-2">
                          - {ingredient.quantity} {ingredient.unit}
                        </span>
                      )}
                    </label>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Steps */}
            <div className="mb-8">
              <h2 className="text-2xl font-heading font-semibold mb-4">
                Instructions
              </h2>
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-muted" />
                <motion.div
                  className="absolute left-6 top-0 w-0.5 bg-gradient-primary"
                  initial={{ height: 0 }}
                  animate={{ height: `${(completedSteps.length / recipe.steps.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
                <div className="space-y-6">
                  {recipe.steps.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-4 relative"
                    >
                      <button
                        onClick={() => toggleStep(i)}
                        className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all btn-scale z-10 ${
                          completedSteps.includes(i)
                            ? "bg-gradient-primary text-white"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {completedSteps.includes(i) ? <Check className="h-5 w-5" /> : i + 1}
                      </button>
                      <div
                        className={`flex-1 p-4 rounded-lg transition-all ${
                          completedSteps.includes(i) ? "bg-primary/10" : "bg-muted/30"
                        }`}
                      >
                        <p className={completedSteps.includes(i) ? "line-through opacity-70" : ""}>
                          {step}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Nutrition */}
            <div>
              <h2 className="text-2xl font-heading font-semibold mb-4">
                Nutrition Facts
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Calories</span>
                    <span className="text-muted-foreground">{recipe.nutrition.calories}</span>
                  </div>
                  <Progress value={recipe.nutrition.calories / 25} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Protein</span>
                    <span className="text-muted-foreground">{recipe.nutrition.protein}g</span>
                  </div>
                  <Progress value={recipe.nutrition.protein * 2} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Carbs</span>
                    <span className="text-muted-foreground">{recipe.nutrition.carbs}g</span>
                  </div>
                  <Progress value={recipe.nutrition.carbs / 1.5} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Fats</span>
                    <span className="text-muted-foreground">{recipe.nutrition.fats}g</span>
                  </div>
                  <Progress value={recipe.nutrition.fats * 2} className="h-2" />
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
