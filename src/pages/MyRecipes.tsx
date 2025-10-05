/* PAGE: /my-recipes */
import { useState } from "react";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecipeCard } from "@/components/shared/RecipeCard";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockRecipes, Recipe } from "@/data/mockRecipes";
import { toast } from "sonner";

export default function MyRecipes() {
  const navigate = useNavigate();
  const [savedRecipes] = useState<Recipe[]>(mockRecipes.slice(0, 2));
  const [uploadedRecipes] = useState<Recipe[]>([mockRecipes[2]]);
  const [drafts] = useState<Recipe[]>([]);

  const handleViewRecipe = (recipe: Recipe) => {
    toast.info("Recipe detail view would open here");
  };

  const EmptyState = ({ title, description, actionText, onAction }: {
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
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-2">
              My Recipes
            </h1>
            <p className="text-xl text-muted-foreground">
              Manage your saved and uploaded recipes
            </p>
          </div>
          <Button onClick={() => navigate("/upload")} className="btn-scale">
            <Plus className="mr-2 h-5 w-5" />
            Upload Recipe
          </Button>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
            <TabsTrigger value="uploaded">Uploaded</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {[...savedRecipes, ...uploadedRecipes].length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...savedRecipes, ...uploadedRecipes].map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onView={() => handleViewRecipe(recipe)}
                    isSaved={savedRecipes.includes(recipe)}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No recipes yet"
                description="Start by generating a recipe or uploading your own!"
                actionText="Generate Recipe"
                onAction={() => navigate("/generate")}
              />
            )}
          </TabsContent>

          <TabsContent value="saved" className="space-y-6">
            {savedRecipes.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onView={() => handleViewRecipe(recipe)}
                    isSaved={true}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No saved recipes"
                description="Save recipes you love to find them easily later"
                actionText="Explore Recipes"
                onAction={() => navigate("/explore")}
              />
            )}
          </TabsContent>

          <TabsContent value="uploaded" className="space-y-6">
            {uploadedRecipes.length > 0 ? (
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

          <TabsContent value="drafts" className="space-y-6">
            {drafts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {drafts.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onView={() => handleViewRecipe(recipe)}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No drafts"
                description="Your draft recipes will appear here"
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
