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
  const [isFlipped, setIsFlipped] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Import the image dynamically
  const getImageSrc = () => {
    try {
      return new URL(`/src/assets/${recipe.image}.jpg`, import.meta.url).href;
    } catch {
      return `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=800&fit=crop`;
    }
  };

  return (
    <Card
      className={cn(
        "group overflow-hidden rounded-2xl border-border transition-all duration-300 card-hover",
        "relative h-[400px] cursor-pointer perspective-1000"
      )}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={cn(
          "relative w-full h-full transition-transform duration-500 transform-style-3d",
          isFlipped && "rotate-y-180"
        )}
      >
        {/* Front Side */}
        <div className="absolute inset-0 backface-hidden">
          <div className="relative h-48 overflow-hidden">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-muted shimmer" />
            )}
            <img
              src={getImageSrc()}
              alt={recipe.title}
              className={cn(
                "h-full w-full object-cover transition-all duration-300 group-hover:scale-110",
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

          <div className="p-4 space-y-3">
            <h3 className="text-xl font-heading font-semibold line-clamp-2">
              {recipe.title}
            </h3>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{recipe.cookTime} min</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{recipe.servings} servings</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-primary font-medium">★ {recipe.rating}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-secondary/20 text-secondary-foreground">
                {recipe.cuisine}
              </Badge>
              {recipe.allergens.slice(0, 2).map((allergen) => (
                <Badge key={allergen} variant="outline" className="text-xs">
                  {allergen}
                </Badge>
              ))}
            </div>

            <Button onClick={onView} className="w-full btn-scale">
              <Eye className="h-4 w-4 mr-2" />
              View Recipe
            </Button>
          </div>
        </div>

        {/* Back Side - Nutrition */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-card backdrop-blur-lg border border-border/50 p-6 flex flex-col justify-center">
          <h4 className="text-lg font-heading font-semibold mb-4 text-center">
            Nutrition Facts
          </h4>
          <div className="space-y-3">
            {Object.entries(recipe.nutrition).map(([key, value]) => (
              <div key={key}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="capitalize">{key}</span>
                  <span className="font-medium">{value}{key === 'calories' ? '' : 'g'}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-primary transition-all duration-500"
                    style={{
                      width: `${key === 'calories' ? (value / 800) * 100 : (value / 100) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <Button onClick={onView} variant="secondary" className="mt-6 w-full btn-scale">
            View Full Recipe
          </Button>
        </div>
      </div>
    </Card>
  );
}
