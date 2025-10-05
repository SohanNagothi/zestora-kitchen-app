/* PAGE: /search */
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RecipeCard } from "@/components/shared/RecipeCard";
import { motion } from "framer-motion";
import { Search as SearchIcon, SlidersHorizontal } from "lucide-react";
import { mockRecipes, Recipe } from "@/data/mockRecipes";
import { toast } from "sonner";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [cuisine, setCuisine] = useState("all");
  const [maxTime, setMaxTime] = useState("all");
  const [diet, setDiet] = useState("all");
  const [results, setResults] = useState<Recipe[]>(mockRecipes);

  useEffect(() => {
    // Simulate search filtering
    let filtered = mockRecipes;

    if (query) {
      filtered = filtered.filter(
        r =>
          r.title.toLowerCase().includes(query.toLowerCase()) ||
          r.cuisine.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (cuisine !== "all") {
      filtered = filtered.filter(r => r.cuisine === cuisine);
    }

    if (maxTime !== "all") {
      const time = parseInt(maxTime);
      filtered = filtered.filter(r => r.cookTime <= time);
    }

    setResults(filtered);
  }, [query, cuisine, maxTime, diet]);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  };

  const handleViewRecipe = (recipe: Recipe) => {
    toast.info("Recipe detail view would open here");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Search Recipes</h1>

            {/* Search Bar */}
            <div className="relative mb-6">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search for recipes, ingredients, or cuisines..."
                className="pl-12 h-14 text-lg input-glow"
              />
            </div>

            {/* Filters */}
            <div className="glass-card rounded-xl p-4 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <SlidersHorizontal className="h-5 w-5 text-primary" />
                <h2 className="font-semibold">Filters</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Cuisine</label>
                  <Select value={cuisine} onValueChange={setCuisine}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Cuisines</SelectItem>
                      <SelectItem value="Italian">Italian</SelectItem>
                      <SelectItem value="Asian">Asian</SelectItem>
                      <SelectItem value="Mexican">Mexican</SelectItem>
                      <SelectItem value="Mediterranean">Mediterranean</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Max Cook Time</label>
                  <Select value={maxTime} onValueChange={setMaxTime}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Duration</SelectItem>
                      <SelectItem value="15">Under 15 mins</SelectItem>
                      <SelectItem value="30">Under 30 mins</SelectItem>
                      <SelectItem value="60">Under 1 hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Diet</label>
                  <Select value={diet} onValueChange={setDiet}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Diets</SelectItem>
                      <SelectItem value="vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="vegan">Vegan</SelectItem>
                      <SelectItem value="keto">Keto</SelectItem>
                      <SelectItem value="paleo">Paleo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold">
              {results.length} {results.length === 1 ? "result" : "results"}
              {query && ` for "${query}"`}
            </h2>
          </div>

          {results.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((recipe, index) => (
                <motion.div
                  key={recipe.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <RecipeCard recipe={recipe} onView={() => handleViewRecipe(recipe)} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-16 shadow-soft text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
                <SearchIcon className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-heading font-semibold mb-2">No recipes found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters to find what you're looking for
              </p>
            </div>
          )}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
