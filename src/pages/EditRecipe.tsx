/* PAGE: /my-recipes/:id/edit */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { motion } from "framer-motion";
import { Plus, Trash2, GripVertical, X } from "lucide-react";
import { mockRecipes } from "@/data/mockRecipes";
import { toast } from "sonner";

interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
}

export default function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [servings, setServings] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [steps, setSteps] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const recipe = mockRecipes.find(r => r.id === id);
    if (recipe) {
      setTitle(recipe.title);
      setCuisine(recipe.cuisine);
      setCookTime(recipe.cookTime.toString());
      setServings(recipe.servings.toString());
      setIngredients(recipe.ingredients);
      setSteps(recipe.steps);
      setIsLoading(false);
    } else {
      toast.error("Recipe not found");
      navigate("/my-recipes");
    }
  }, [id, navigate]);

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "", unit: "g" }]);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const updateIngredient = (index: number, field: keyof Ingredient, value: string) => {
    const updated = [...ingredients];
    updated[index][field] = value;
    setIngredients(updated);
  };

  const addStep = () => {
    setSteps([...steps, ""]);
  };

  const removeStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const updateStep = (index: number, value: string) => {
    const updated = [...steps];
    updated[index] = value;
    setSteps(updated);
  };

  const handleSave = () => {
    if (!title || ingredients.length === 0 || steps.length === 0) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success("Recipe updated successfully!");
    navigate("/my-recipes");
  };

  const handleDelete = () => {
    toast.success("Recipe deleted successfully!");
    navigate("/my-recipes");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-2">Edit Recipe</h1>
            <p className="text-xl text-muted-foreground">Update your recipe details</p>
          </div>

          <div className="glass-card rounded-2xl p-8 shadow-strong space-y-8">
            {/* Basic Info */}
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-semibold">Basic Information</h2>
              <div>
                <label className="block text-sm font-medium mb-2">Recipe Title *</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Grandma's Secret Pasta"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Cuisine *</label>
                  <Select value={cuisine} onValueChange={setCuisine}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Italian">Italian</SelectItem>
                      <SelectItem value="Chinese">Chinese</SelectItem>
                      <SelectItem value="Mexican">Mexican</SelectItem>
                      <SelectItem value="Indian">Indian</SelectItem>
                      <SelectItem value="Asian">Asian</SelectItem>
                      <SelectItem value="Mediterranean">Mediterranean</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Cook Time (mins) *</label>
                  <Input
                    type="number"
                    value={cookTime}
                    onChange={(e) => setCookTime(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Servings *</label>
                  <Input
                    type="number"
                    value={servings}
                    onChange={(e) => setServings(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-heading font-semibold">Ingredients *</h2>
                <Button onClick={addIngredient} variant="outline" className="btn-scale">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Ingredient
                </Button>
              </div>
              <div className="space-y-3">
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                    <Input
                      placeholder="Ingredient name"
                      value={ingredient.name}
                      onChange={(e) => updateIngredient(index, "name", e.target.value)}
                      className="flex-1"
                    />
                    <Input
                      placeholder="Qty"
                      value={ingredient.quantity}
                      onChange={(e) => updateIngredient(index, "quantity", e.target.value)}
                      className="w-24"
                    />
                    <Select
                      value={ingredient.unit}
                      onValueChange={(value) => updateIngredient(index, "unit", value)}
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="g">g</SelectItem>
                        <SelectItem value="kg">kg</SelectItem>
                        <SelectItem value="ml">ml</SelectItem>
                        <SelectItem value="tbsp">tbsp</SelectItem>
                        <SelectItem value="pcs">pcs</SelectItem>
                      </SelectContent>
                    </Select>
                    {ingredients.length > 1 && (
                      <Button
                        onClick={() => removeIngredient(index)}
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Steps */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-heading font-semibold">Cooking Steps *</h2>
                <Button onClick={addStep} variant="outline" className="btn-scale">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Step
                </Button>
              </div>
              <div className="space-y-3">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold mt-2">
                      {index + 1}
                    </div>
                    <Textarea
                      placeholder={`Step ${index + 1}`}
                      value={step}
                      onChange={(e) => updateStep(index, e.target.value)}
                      className="flex-1"
                      rows={2}
                    />
                    {steps.length > 1 && (
                      <Button
                        onClick={() => removeStep(index)}
                        variant="ghost"
                        size="icon"
                        className="text-destructive mt-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-6 border-t">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Delete Recipe</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your recipe.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => navigate("/my-recipes")}>
                  Cancel
                </Button>
                <Button onClick={handleSave} className="btn-scale">
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
