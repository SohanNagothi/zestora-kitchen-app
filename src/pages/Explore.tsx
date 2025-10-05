/* PAGE: /explore */
import { useState } from "react";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { RecipeCard } from "@/components/shared/RecipeCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockRecipes, Recipe } from "@/data/mockRecipes";
import { toast } from "sonner";

export default function Explore() {
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const [savedRecipes, setSavedRecipes] = useState<Set<string>>(new Set());

  const cuisines = ["All", "Italian", "Asian", "Mexican", "Mediterranean", "Indian"];

  const filteredRecipes = selectedCuisine && selectedCuisine !== "All"
    ? mockRecipes.filter((r) => r.cuisine === selectedCuisine)
    : mockRecipes;

  const handleViewRecipe = (recipe: Recipe) => {
    toast.info("Recipe detail view would open here");
  };

  const handleSaveRecipe = (recipeId: string) => {
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Explore Recipes
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover trending recipes and curated collections
          </p>
        </div>

        {/* Cuisine Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {cuisines.map((cuisine) => (
            <Badge
              key={cuisine}
              variant={selectedCuisine === cuisine ? "default" : "outline"}
              className="cursor-pointer px-6 py-2 text-sm hover:scale-105 transition-transform"
              onClick={() => setSelectedCuisine(cuisine === "All" ? null : cuisine)}
            >
              {cuisine}
            </Badge>
          ))}
        </div>

        {/* Recipe Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onView={() => handleViewRecipe(recipe)}
              onSave={() => handleSaveRecipe(recipe.id)}
              isSaved={savedRecipes.has(recipe.id)}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
