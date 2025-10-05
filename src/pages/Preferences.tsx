/* PAGE: /preferences */
import { useState } from "react";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { Bell, Mail, MessageSquare, Shield, User } from "lucide-react";
import { toast } from "sonner";

export default function Preferences() {
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: false,
    recipeUpdates: true,
    weeklyDigest: true,
    communityNews: false,
    allergens: ["Dairy", "Nuts"],
    maxCookTime: 60,
    servingSize: 4,
  });

  const handleSave = () => {
    toast.success("Preferences saved successfully!");
  };

  const handleReset = () => {
    setPreferences({
      emailNotifications: true,
      pushNotifications: false,
      smsNotifications: false,
      recipeUpdates: true,
      weeklyDigest: true,
      communityNews: false,
      allergens: [],
      maxCookTime: 60,
      servingSize: 4,
    });
    toast.info("Preferences reset to defaults");
  };

  const toggleAllergen = (allergen: string) => {
    setPreferences(prev => ({
      ...prev,
      allergens: prev.allergens.includes(allergen)
        ? prev.allergens.filter(a => a !== allergen)
        : [...prev.allergens, allergen]
    }));
  };

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
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-2">Preferences</h1>
            <p className="text-xl text-muted-foreground">Customize your Zestora experience</p>
          </div>

          <div className="space-y-6">
            {/* Notifications */}
            <div className="glass-card rounded-2xl p-6 shadow-soft">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-heading font-semibold">Notifications</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-colors">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                  </div>
                  <Switch
                    checked={preferences.emailNotifications}
                    onCheckedChange={(checked) =>
                      setPreferences(prev => ({ ...prev, emailNotifications: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-colors">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">Get instant updates on your device</p>
                  </div>
                  <Switch
                    checked={preferences.pushNotifications}
                    onCheckedChange={(checked) =>
                      setPreferences(prev => ({ ...prev, pushNotifications: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-colors">
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive text messages</p>
                  </div>
                  <Switch
                    checked={preferences.smsNotifications}
                    onCheckedChange={(checked) =>
                      setPreferences(prev => ({ ...prev, smsNotifications: checked }))
                    }
                  />
                </div>
              </div>
            </div>

            {/* Email Preferences */}
            <div className="glass-card rounded-2xl p-6 shadow-soft">
              <div className="flex items-center gap-3 mb-6">
                <Mail className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-heading font-semibold">Email Preferences</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                  <Checkbox
                    id="recipe-updates"
                    checked={preferences.recipeUpdates}
                    onCheckedChange={(checked) =>
                      setPreferences(prev => ({ ...prev, recipeUpdates: checked as boolean }))
                    }
                  />
                  <label htmlFor="recipe-updates" className="flex-1 cursor-pointer">
                    <p className="font-medium">Recipe Updates</p>
                    <p className="text-sm text-muted-foreground">New recipes matching your preferences</p>
                  </label>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                  <Checkbox
                    id="weekly-digest"
                    checked={preferences.weeklyDigest}
                    onCheckedChange={(checked) =>
                      setPreferences(prev => ({ ...prev, weeklyDigest: checked as boolean }))
                    }
                  />
                  <label htmlFor="weekly-digest" className="flex-1 cursor-pointer">
                    <p className="font-medium">Weekly Digest</p>
                    <p className="text-sm text-muted-foreground">Summary of top recipes and tips</p>
                  </label>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                  <Checkbox
                    id="community-news"
                    checked={preferences.communityNews}
                    onCheckedChange={(checked) =>
                      setPreferences(prev => ({ ...prev, communityNews: checked as boolean }))
                    }
                  />
                  <label htmlFor="community-news" className="flex-1 cursor-pointer">
                    <p className="font-medium">Community News</p>
                    <p className="text-sm text-muted-foreground">Updates from the Zestora community</p>
                  </label>
                </div>
              </div>
            </div>

            {/* Dietary Preferences */}
            <div className="glass-card rounded-2xl p-6 shadow-soft">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-heading font-semibold">Dietary Restrictions</h2>
              </div>

              <div className="space-y-4">
                <p className="text-muted-foreground">Select allergens to avoid in recipes</p>
                <div className="flex flex-wrap gap-3">
                  {["Dairy", "Gluten", "Nuts", "Seafood", "Eggs", "Soy"].map(allergen => (
                    <motion.button
                      key={allergen}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleAllergen(allergen)}
                      className={`chip-button ${
                        preferences.allergens.includes(allergen) ? "chip-active" : ""
                      }`}
                    >
                      {allergen}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Cooking Preferences */}
            <div className="glass-card rounded-2xl p-6 shadow-soft">
              <div className="flex items-center gap-3 mb-6">
                <User className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-heading font-semibold">Cooking Preferences</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="font-medium">Maximum Cook Time</label>
                    <span className="text-muted-foreground">{preferences.maxCookTime} minutes</span>
                  </div>
                  <Slider
                    value={[preferences.maxCookTime]}
                    onValueChange={([value]) =>
                      setPreferences(prev => ({ ...prev, maxCookTime: value }))
                    }
                    min={15}
                    max={180}
                    step={15}
                    className="py-4"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="font-medium">Default Serving Size</label>
                    <span className="text-muted-foreground">{preferences.servingSize} servings</span>
                  </div>
                  <Slider
                    value={[preferences.servingSize]}
                    onValueChange={([value]) =>
                      setPreferences(prev => ({ ...prev, servingSize: value }))
                    }
                    min={1}
                    max={12}
                    step={1}
                    className="py-4"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <Button variant="outline" onClick={handleReset}>
                Reset to Defaults
              </Button>
              <Button onClick={handleSave} className="btn-scale">
                Save Preferences
              </Button>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
