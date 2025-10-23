/* COMPONENT: RecipeCard.tsx */
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Clock, Users, Eye } from "lucide-react";
import { Recipe } from "@/data/mockRecipes";
import { cn } from "@/lib/utils";

interface RecipeCardProps {
  recipe: Recipe;
  onView: () => void;
  onSave?: () => void;
  isSaved?: boolean;
}

export function RecipeCard({ recipe, onView, onSave, isSaved }: RecipeCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const getImageSrc = () => {
  if (recipe.imageUrl) return recipe.imageUrl; // ✅ from S3
  if (recipe.image) return recipe.image;       // ✅ from mock or local recipes
  return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=800&fit=crop"; // fallback
};


  return (
    <Card className="group overflow-hidden rounded-2xl border-border transition-all duration-300 cursor-pointer">
      <div className="relative h-64 overflow-hidden">
        {!imageLoaded && <div className="absolute inset-0 bg-muted shimmer" />}
        <img
          src={getImageSrc()}
          alt={recipe.title}
          className={cn(
            "h-full w-full object-cover transition-transform duration-300 group-hover:scale-110",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
        />
        {onSave && (
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background",
              isSaved && "text-destructive"
            )}
            onClick={(e) => {
              e.stopPropagation();
              onSave();
            }}
          >
            <Heart className={cn("h-5 w-5", isSaved && "fill-current")} />
          </Button>
        )}
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-xl font-semibold line-clamp-2">{recipe.title}</h3>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{recipe.cookTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{recipe.servings} servings</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="secondary">{recipe.cuisine}</Badge>
          {recipe.allergens.length === 0 && <Badge variant="outline">Allergen-Free</Badge>}
          {recipe.allergens.map((allergen) => (
            <Badge key={allergen} variant="destructive">{allergen}</Badge>
          ))}
        </div>

        <Button onClick={onView} className="w-full mt-2 btn-scale">
          <Eye className="h-4 w-4 mr-2" /> View Recipe
        </Button>
      </div>
    </Card>
  );
}
