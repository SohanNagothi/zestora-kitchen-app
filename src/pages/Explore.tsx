/* PAGE: /explore */
import { useState, useEffect } from "react";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { RecipeCard } from "@/components/shared/RecipeCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Explore() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const [savedRecipes, setSavedRecipes] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL =
    "https://5kpk7ptkq4ere3qwmm36cvttny0iefos.lambda-url.us-east-1.on.aws/";

  const cuisines = [
    "All",
    "Italian",
    "Asian",
    "Mexican",
    "Mediterranean",
    "Indian",
  ];

  // --- Fetch Trending Recipes on Mount ---
  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async (query = "") => {
    try {
      setLoading(true);

      const res = await fetch(API_URL + (query ? `?q=${encodeURIComponent(query)}` : ""));
      const data = await res.json();


      if (!res.ok) throw new Error(data.error || "Failed to fetch recipes");

      const normalized = (data.results || []).map((r: any) => ({
        id: r.id || crypto.randomUUID(),
        title: r.title || "Untitled",
        image:
          r.image ||
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
        cuisine: r.cuisine || "Unknown",
        cookTime: r.cookTime || 0,
        servings: r.servings || 1,
        ingredients: Array.isArray(r.ingredients) ? r.ingredients : [],
        steps: Array.isArray(r.steps) ? r.steps : [],
        source: r.source || "unknown",
        rating: r.rating || 4.5,
        allergens: r.allergens || [],
        nutrition: r.nutrition || {
          calories: 0,
          protein: 0,
          carbs: 0,
          fats: 0,
        },
      }));

      setRecipes(normalized);
      // Apply cuisine filter if already selected
      if (selectedCuisine && selectedCuisine !== "All") {
        setFiltered(normalized.filter((r) => r.cuisine === selectedCuisine));
      } else {
        setFiltered(normalized);
      }
    } catch (err: any) {
      console.error("Fetch error:", err);
      toast.error("Failed to load recipes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      toast.info("Showing trending recipes");
      fetchRecipes();
      return;
    }
    await fetchRecipes(searchTerm);
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

  // --- Filter by Cuisine ---
  const handleCuisineSelect = (cuisine: string) => {
    setSelectedCuisine(cuisine === "All" ? null : cuisine);
    if (cuisine === "All") setFiltered(recipes);
    else setFiltered(recipes.filter((r) => r.cuisine === cuisine));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-orange-50 via-white to-orange-100">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-3">
            Explore Recipes 🍳
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover trending and community-uploaded recipes
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-10">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search recipes by name..."
            className="max-w-md"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button onClick={handleSearch} className="px-6">
            Search
          </Button>
        </div>

        {/* Cuisine Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {cuisines.map((cuisine) => (
            <Badge
              key={cuisine}
              variant={selectedCuisine === cuisine ? "default" : "outline"}
              className="cursor-pointer px-6 py-2 text-sm hover:scale-105 transition-transform"
              onClick={() => handleCuisineSelect(cuisine)}
            >
              {cuisine}
            </Badge>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary" />
          </div>
        )}

        {/* Recipe Grid */}
        {!loading && filtered.length > 0 && (
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                // ✅ Pass full recipe object via state
                onView={() => navigate(`/recipe/${recipe.id}`, { state: { recipe } })}
                onSave={() => handleSaveRecipe(recipe.id)}
                isSaved={savedRecipes.has(recipe.id)}
              />
            ))}
          </motion.div>
        )}

        {/* No Results */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No recipes found. Try a different search term!
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
