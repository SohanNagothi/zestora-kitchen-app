/* PAGE: /onboarding */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { ChefHat, Milk, Wheat, Nut, Fish, Egg, Apple, Globe, UtensilsCrossed, Leaf } from "lucide-react";
import { toast } from "sonner";

const allergenIcons = {
  Dairy: Milk,
  Gluten: Wheat,
  Nuts: Nut,
  Seafood: Fish,
  Eggs: Egg,
};

const cuisineOptions = [
  "Italian", "Chinese", "Mexican", "Indian", "Japanese", "Thai", "French", "Mediterranean", "American", "Korean"
];

const pantryStaples = [
  "Olive Oil", "Salt", "Pepper", "Garlic", "Onion", "Tomatoes", "Rice", "Pasta", 
  "Flour", "Sugar", "Eggs", "Milk", "Butter", "Soy Sauce", "Vinegar", "Herbs"
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    diet: [] as string[],
    allergens: [] as string[],
    cuisines: [] as string[],
    pantry: [] as string[],
  });

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
    else handleComplete();
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = () => {
    toast.success("Your preferences have been saved!");
    navigate("/generate");
  };

  const toggleItem = (category: keyof typeof preferences, item: string) => {
    setPreferences(prev => ({
      ...prev,
      [category]: prev[category].includes(item)
        ? prev[category].filter(i => i !== item)
        : [...prev[category], item]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl"
      >
        <div className="glass-card rounded-2xl p-8 shadow-strong">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-primary p-3 rounded-xl">
              <ChefHat className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-heading font-bold">Welcome to Zestora</h1>
              <p className="text-muted-foreground">Let's personalize your experience</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Step {step} of {totalSteps}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Steps */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-heading font-semibold mb-2">Dietary Preferences</h2>
                  <p className="text-muted-foreground">Select any that apply to you</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {["Vegetarian", "Vegan", "Pescatarian", "Keto", "Paleo", "Low-Carb", "Halal", "Kosher"].map(diet => (
                    <motion.button
                      key={diet}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleItem("diet", diet)}
                      className={`chip-button ${preferences.diet.includes(diet) ? "chip-active" : ""}`}
                    >
                      <Leaf className="h-4 w-4" />
                      {diet}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-heading font-semibold mb-2">Food Allergies</h2>
                  <p className="text-muted-foreground">Help us keep you safe</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {Object.entries(allergenIcons).map(([allergen, Icon]) => (
                    <motion.button
                      key={allergen}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleItem("allergens", allergen)}
                      className={`chip-button ${preferences.allergens.includes(allergen) ? "chip-active" : ""}`}
                    >
                      <Icon className="h-4 w-4" />
                      {allergen}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-heading font-semibold mb-2">Favorite Cuisines</h2>
                  <p className="text-muted-foreground">What flavors do you love?</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {cuisineOptions.map(cuisine => (
                    <motion.button
                      key={cuisine}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleItem("cuisines", cuisine)}
                      className={`chip-button ${preferences.cuisines.includes(cuisine) ? "chip-active" : ""}`}
                    >
                      <Globe className="h-4 w-4" />
                      {cuisine}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-heading font-semibold mb-2">Pantry Staples</h2>
                  <p className="text-muted-foreground">Quick-add common ingredients</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {pantryStaples.map(item => (
                    <motion.button
                      key={item}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleItem("pantry", item)}
                      className={`chip-button ${preferences.pantry.includes(item) ? "chip-active" : ""}`}
                    >
                      <UtensilsCrossed className="h-4 w-4" />
                      {item}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
              className="btn-scale"
            >
              Back
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/generate")}
              className="text-muted-foreground"
            >
              Skip for now
            </Button>
            <Button onClick={handleNext} className="btn-scale">
              {step === totalSteps ? "Save & Continue" : "Next"}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
