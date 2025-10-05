/* PAGE: /generate */
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { RecipeCard } from "@/components/shared/RecipeCard";
import { TextShimmerWave, SkeletonCard } from "@/components/ui/text-shimmer-wave";
import { X, Sparkles, Shuffle, Save } from "lucide-react";
import { toast } from "sonner";
import { mockRecipes, Recipe } from "@/data/mockRecipes";
import { useAuth } from "@/lib/hooks/useAuth";

export default function Generate() {
  const [searchParams] = useSearchParams();
  const { isAuthenticated } = useAuth();
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState("");
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [cuisine, setCuisine] = useState("");
  const [maxCookTime, setMaxCookTime] = useState([60]);
  const [numResults, setNumResults] = useState([6]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<Set<string>>(new Set());

  const allergies = ["Gluten", "Dairy", "Nuts", "Soy", "Eggs", "Shellfish"];
  const cuisines = ["Any", "Italian", "Asian", "Mexican", "Mediterranean", "Indian", "American"];
  const suggestedIngredients = ["Chicken", "Rice", "Tomatoes", "Onions", "Garlic", "Pasta", "Cheese", "Broccoli"];

  // Load demo ingredients if present
  useEffect(() => {
    const demo = searchParams.get("demo");
    if (demo) {
      const demoIngredients = demo.split(",").map((i) => i.trim()).filter(Boolean);
      setIngredients(demoIngredients);
    }
  }, [searchParams]);

  const addIngredient = () => {
    if (currentIngredient.trim() && !ingredients.includes(currentIngredient.trim())) {
      setIngredients([...ingredients, currentIngredient.trim()]);
      setCurrentIngredient("");
    }
  };

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter((i) => i !== ingredient));
  };

  const toggleAllergy = (allergy: string) => {
    setSelectedAllergies((prev) =>
      prev.includes(allergy) ? prev.filter((a) => a !== allergy) : [...prev, allergy]
    );
  };

  const handleGenerate = async () => {
    if (ingredients.length === 0) {
      toast.error("Please add at least one ingredient");
      return;
    }

    setIsGenerating(true);
    setRecipes([]);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Filter mock recipes (in real app, this would be an API call)
    const filteredRecipes = mockRecipes
      .filter((recipe) => {
        // Filter by allergies
        if (selectedAllergies.length > 0) {
          const hasAllergen = recipe.allergens.some((a) => selectedAllergies.includes(a));
          if (hasAllergen) return false;
        }
        // Filter by cuisine
        if (cuisine && cuisine !== "Any" && recipe.cuisine !== cuisine) {
          return false;
        }
        // Filter by cook time
        if (recipe.cookTime > maxCookTime[0]) {
          return false;
        }
        return true;
      })
      .slice(0, numResults[0]);

    setRecipes(filteredRecipes);
    setIsGenerating(false);

    if (filteredRecipes.length === 0) {
      toast.error("No recipes found matching your criteria. Try adjusting your filters.");
    } else {
      toast.success(`Found ${filteredRecipes.length} delicious recipes!`);
    }
  };

  const handleRandom = () => {
    const randomRecipes = [...mockRecipes].sort(() => Math.random() - 0.5).slice(0, 3);
    setRecipes(randomRecipes);
    toast.success("Here are some random recipes for inspiration!");
  };

  const handleSaveRecipe = (recipeId: string) => {
    if (!isAuthenticated) {
      toast.error("Please log in to save recipes");
      return;
    }

    setSavedRecipes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(recipeId)) {
        newSet.delete(recipeId);
        toast.success("Recipe removed from saved");
      } else {
        newSet.add(recipeId);
        toast.success("Recipe saved!");
      }
      return newSet;
    });
  };

  const handleViewRecipe = (recipe: Recipe) => {
    // In a real app, this would navigate to /recipe/:id
    toast.info("Recipe detail view would open here");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Generate Your Perfect Recipe
          </h1>
          <p className="text-xl text-muted-foreground">
            Tell us what you have, and we'll create something delicious
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr,2fr] gap-8 mb-12">
          {/* Left Panel: Inputs */}
          <Card className="glass p-6 space-y-6 h-fit sticky top-24">
            {/* Ingredients Input */}
            <div className="space-y-3">
              <Label htmlFor="ingredient">Ingredients</Label>
              <div className="flex gap-2">
                <Input
                  id="ingredient"
                  placeholder="Type and press Enter..."
                  value={currentIngredient}
                  onChange={(e) => setCurrentIngredient(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addIngredient()}
                />
                <Button onClick={addIngredient} className="btn-scale">
                  Add
                </Button>
              </div>

              {/* Ingredient Tags */}
              {ingredients.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {ingredients.map((ingredient) => (
                    <Badge
                      key={ingredient}
                      variant="secondary"
                      className="pl-3 pr-1 py-1 text-sm"
                    >
                      {ingredient}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5 ml-1 hover:bg-destructive/20"
                        onClick={() => removeIngredient(ingredient)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}

              {/* Suggested Ingredients */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">Quick add:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedIngredients
                    .filter((s) => !ingredients.includes(s))
                    .slice(0, 6)
                    .map((suggestion) => (
                      <Badge
                        key={suggestion}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary/10"
                        onClick={() => setIngredients([...ingredients, suggestion])}
                      >
                        + {suggestion}
                      </Badge>
                    ))}
                </div>
              </div>
            </div>

            {/* Allergies */}
            <div className="space-y-3">
              <Label>Allergies & Restrictions</Label>
              <div className="space-y-2">
                {allergies.map((allergy) => (
                  <div key={allergy} className="flex items-center space-x-2">
                    <Checkbox
                      id={allergy}
                      checked={selectedAllergies.includes(allergy)}
                      onCheckedChange={() => toggleAllergy(allergy)}
                    />
                    <label
                      htmlFor={allergy}
                      className="text-sm cursor-pointer"
                    >
                      {allergy}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Cuisine */}
            <div className="space-y-2">
              <Label>Cuisine Type</Label>
              <Select value={cuisine} onValueChange={setCuisine}>
                <SelectTrigger>
                  <SelectValue placeholder="Any cuisine" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  {cuisines.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Max Cook Time */}
            <div className="space-y-3">
              <Label>Max Cook Time: {maxCookTime[0]} min</Label>
              <Slider
                value={maxCookTime}
                onValueChange={setMaxCookTime}
                min={10}
                max={120}
                step={5}
              />
            </div>

            {/* Number of Results */}
            <div className="space-y-3">
              <Label>Number of Results: {numResults[0]}</Label>
              <Slider
                value={numResults}
                onValueChange={setNumResults}
                min={3}
                max={12}
                step={1}
              />
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <Button
                onClick={handleGenerate}
                className="w-full btn-scale"
                disabled={isGenerating || ingredients.length === 0}
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Generate Recipes
              </Button>
              <Button
                onClick={handleRandom}
                variant="outline"
                className="w-full"
                disabled={isGenerating}
              >
                <Shuffle className="mr-2 h-5 w-5" />
                Random Recipe
              </Button>
            </div>
          </Card>

          {/* Right Panel: Results */}
          <div>
            {isGenerating ? (
              <div className="space-y-6">
                <TextShimmerWave text="Generating your perfect recipes..." />
                <div className="grid md:grid-cols-2 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              </div>
            ) : recipes.length > 0 ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-heading font-semibold">
                    Your Recipes ({recipes.length})
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {recipes.map((recipe) => (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      onView={() => handleViewRecipe(recipe)}
                      onSave={() => handleSaveRecipe(recipe.id)}
                      isSaved={savedRecipes.has(recipe.id)}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <Card className="glass p-12 text-center">
                <Sparkles className="h-16 w-16 mx-auto mb-4 text-primary/50" />
                <h3 className="text-2xl font-heading font-semibold mb-2">
                  Ready to Cook?
                </h3>
                <p className="text-muted-foreground">
                  Add your ingredients and preferences, then click generate to discover amazing recipes!
                </p>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
