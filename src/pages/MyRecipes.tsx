/* PAGE: /my-recipes */
import { useEffect, useState } from "react";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecipeCard } from "@/components/shared/RecipeCard";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Define Recipe type
interface Recipe {
  id: string; // recipeId from DynamoDB
  title: string;
  author: string;
  cuisine: string;
  cookTime: string;
  servings: string;
  ingredients: any[];
  instructions: string[];
  imageUrl: string;
  allergens?: string[];
}

export default function MyRecipes() {
  const navigate = useNavigate();
  const [uploadedRecipes, setUploadedRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  const USER_ID = "user-001"; // replace with actual logged-in user ID

  useEffect(() => {
    const fetchUploadedRecipes = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://vixg42ras35hx2a4gnatsyyibm0ayoew.lambda-url.us-east-1.on.aws/?userId=${USER_ID}`
        );

        if (!res.ok) {
          const errorData = await res.json();
          console.error("Error fetching recipes:", errorData);
          toast.error("Failed to fetch uploaded recipes.");
          setLoading(false);
          return;
        }

        const data = await res.json();
        console.log("Fetched uploaded recipes:", data.recipes);

        // Normalize data to prevent undefined values
        const normalizedRecipes: Recipe[] = (data.recipes || []).map((item: any) => ({
          id: item.recipeId,
          title: item.title || "Untitled Recipe",
          author: item.author || "Unknown",
          cuisine: item.cuisine || "Other",
          cookTime: item.cookTime || "0",
          servings: item.servings || "1",
          ingredients: item.ingredients || [],
          instructions: item.instructions || [],
          imageUrl: item.imageUrl || "/placeholder-image.png",
          allergens: item.allergens || [],
        }));

        setUploadedRecipes(normalizedRecipes);
      } catch (err) {
        console.error("Fetch error:", err);
        toast.error("Failed to fetch uploaded recipes.");
      } finally {
        setLoading(false);
      }
    };

    fetchUploadedRecipes();
  }, []);

  const handleViewRecipe = (recipe: Recipe) => {
      // Navigate to recipe detail page with recipe id
      navigate(`/recipe/${recipe.id}`, { state: { recipe } });
    };

  const EmptyState = ({
    title,
    description,
    actionText,
    onAction,
  }: {
    title: string;
    description: string;
    actionText: string;
    onAction: () => void;
  }) => (
    <div className="text-center py-16 px-4">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
        <Plus className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-2xl font-heading font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">{description}</p>
      <Button onClick={onAction} className="btn-scale">
        <Plus className="mr-2 h-5 w-5" />
        {actionText}
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-2">My Recipes</h1>
            <p className="text-xl text-muted-foreground">Manage your uploaded recipes</p>
          </div>
          <Button onClick={() => navigate("/upload")} className="btn-scale">
            <Plus className="mr-2 h-5 w-5" />
            Upload Recipe
          </Button>
        </div>

        <Tabs defaultValue="uploaded" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="uploaded">Uploaded</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {loading ? (
              <p className="text-center py-16">Loading recipes...</p>
            ) : uploadedRecipes.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {uploadedRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onView={() => handleViewRecipe(recipe)}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No recipes yet"
                description="Start by uploading your own recipes!"
                actionText="Upload Recipe"
                onAction={() => navigate("/upload")}
              />
            )}
          </TabsContent>

          <TabsContent value="uploaded" className="space-y-6">
            {loading ? (
              <p className="text-center py-16">Loading uploaded recipes...</p>
            ) : uploadedRecipes.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {uploadedRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onView={() => handleViewRecipe(recipe)}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No uploaded recipes"
                description="Share your favorite recipes with the Zestora community"
                actionText="Upload Recipe"
                onAction={() => navigate("/upload")}
              />
            )}
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
