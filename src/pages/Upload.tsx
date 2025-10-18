/* PAGE: /upload */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { Plus, Trash2, Upload as UploadIcon, GripVertical, X } from "lucide-react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
}

export default function Upload() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState(""); // Author name
  const [cuisine, setCuisine] = useState("");
  const [otherCuisine, setOtherCuisine] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [servings, setServings] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([{ name: "", quantity: "", unit: "g" }]);
  const [steps, setSteps] = useState<string[]>([""]);
  const [image, setImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const USER_ID = "user-001"; // automatic user id

  // --- Ingredient handlers ---
  const addIngredient = () => setIngredients([...ingredients, { name: "", quantity: "", unit: "g" }]);
  const removeIngredient = (index: number) => setIngredients(ingredients.filter((_, i) => i !== index));
  const updateIngredient = (index: number, field: keyof Ingredient, value: string) => {
    const updated = [...ingredients];
    updated[index][field] = value;
    setIngredients(updated);
  };

  // --- Steps handlers ---
  const addStep = () => setSteps([...steps, ""]);
  const removeStep = (index: number) => setSteps(steps.filter((_, i) => i !== index));
  const updateStep = (index: number, value: string) => {
    const updated = [...steps];
    updated[index] = value;
    setSteps(updated);
  };

  // --- Image upload ---
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImage(reader.result);
        console.log("Image loaded successfully");
      } else {
        console.error("Unexpected image type:", typeof reader.result);
        toast.error("Failed to read image file.");
      }
    };
    reader.readAsDataURL(file);
  };

  // --- Publish ---
  const handlePublish = async () => {
    console.clear();
    console.log("Validating fields before upload...");

    if (!title || !author || ingredients.length === 0 || steps.length === 0 || !image) {
      toast.error("Please fill in all required fields and upload an image.");
      return;
    }

    const selectedCuisine = cuisine === "Other" ? otherCuisine : cuisine;

    const base64Data = image.split(",")[1]; // strip prefix safely
    if (!base64Data) {
      toast.error("Invalid image data.");
      return;
    }

    const payload = {
      userId: USER_ID,
      title,
      author,
      cuisine: selectedCuisine,
      cookTime,
      servings,
      ingredients,
      instructions: steps,
      imageBase64: base64Data,
      imageName: `recipe-${uuidv4()}.jpg`,
    };

    console.log("Uploading recipe data:", payload);

    try {
      setIsUploading(true);
      const res = await fetch("https://43avp6qrkvgyqaw3n7ugcvytly0wyzvq.lambda-url.us-east-1.on.aws/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Lambda response:", data);

      if (!res.ok) {
        toast.error(data.error || "Failed to upload recipe.");
      } else {
        toast.success("Recipe uploaded successfully!");
        navigate("/my-recipes");
      }
    } catch (err) {
      console.error("Error uploading recipe:", err);
      toast.error("Upload failed. Check console for details.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-2">Upload Recipe</h1>
            <p className="text-xl text-muted-foreground">Share your culinary creation with the community</p>
          </div>

          <div className="glass-card rounded-2xl p-8 shadow-strong space-y-8">
            {/* Basic Info */}
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-semibold">Basic Information</h2>
              <div>
                <label className="block text-sm font-medium mb-2">Recipe Title *</label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Grandma's Secret Pasta" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Author Name *</label>
                <Input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Your name" />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Cuisine *</label>
                  <Select value={cuisine} onValueChange={setCuisine}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select cuisine" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Italian">Italian</SelectItem>
                      <SelectItem value="Chinese">Chinese</SelectItem>
                      <SelectItem value="Mexican">Mexican</SelectItem>
                      <SelectItem value="Indian">Indian</SelectItem>
                      <SelectItem value="Japanese">Japanese</SelectItem>
                      <SelectItem value="Thai">Thai</SelectItem>
                      <SelectItem value="Korean">Korean</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {cuisine === "Other" && (
                    <Input
                      className="mt-2"
                      placeholder="Enter cuisine"
                      value={otherCuisine}
                      onChange={(e) => setOtherCuisine(e.target.value)}
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Cook Time (mins)</label>
                  <Input type="number" value={cookTime} onChange={(e) => setCookTime(e.target.value)} placeholder="30" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Servings</label>
                  <Input type="number" value={servings} onChange={(e) => setServings(e.target.value)} placeholder="4" />
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <h2 className="text-2xl font-heading font-semibold mb-4">Recipe Image</h2>
              <div className="relative">
                {image ? (
                  <div className="relative rounded-lg overflow-hidden">
                    <img src={image} alt="Preview" className="w-full h-64 object-cover" />
                    <button
                      onClick={() => setImage(null)}
                      className="absolute top-4 right-4 p-2 bg-destructive text-white rounded-full btn-scale"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors">
                    <UploadIcon className="h-12 w-12 text-muted-foreground mb-4" />
                    <span className="text-muted-foreground">Click to upload image</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                  </label>
                )}
              </div>
            </div>

            {/* Ingredients */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-heading font-semibold">Ingredients *</h2>
                <Button onClick={addIngredient} variant="outline">
                  <Plus className="mr-2 h-4 w-4" /> Add Ingredient
                </Button>
              </div>
              <div className="space-y-3">
                {ingredients.map((ingredient, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
                    <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                    <Input placeholder="Ingredient name" value={ingredient.name} onChange={(e) => updateIngredient(index, "name", e.target.value)} className="flex-1" />
                    <Input placeholder="Qty" value={ingredient.quantity} onChange={(e) => updateIngredient(index, "quantity", e.target.value)} className="w-24" />
                    <Select value={ingredient.unit} onValueChange={(value) => updateIngredient(index, "unit", value)}>
                      <SelectTrigger className="w-24"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="g">g</SelectItem>
                        <SelectItem value="kg">kg</SelectItem>
                        <SelectItem value="ml">ml</SelectItem>
                        <SelectItem value="l">l</SelectItem>
                        <SelectItem value="tbsp">tbsp</SelectItem>
                        <SelectItem value="tsp">tsp</SelectItem>
                        <SelectItem value="cup">cup</SelectItem>
                        <SelectItem value="pcs">pcs</SelectItem>
                      </SelectContent>
                    </Select>
                    {ingredients.length > 1 && <Button onClick={() => removeIngredient(index)} variant="ghost" size="icon" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Steps */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-heading font-semibold">Cooking Steps *</h2>
                <Button onClick={addStep} variant="outline"><Plus className="mr-2 h-4 w-4" /> Add Step</Button>
              </div>
              <div className="space-y-3">
                {steps.map((step, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold mt-2">{index + 1}</div>
                    <Textarea placeholder={`Step ${index + 1} instructions`} value={step} onChange={(e) => updateStep(index, e.target.value)} className="flex-1" rows={2} />
                    {steps.length > 1 && <Button onClick={() => removeStep(index)} variant="ghost" size="icon" className="text-destructive mt-2"><Trash2 className="h-4 w-4" /></Button>}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-6 border-t">
              <Button variant="ghost" onClick={() => navigate("/my-recipes")}>Cancel</Button>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => toast.success("Draft saved!")}>Save Draft</Button>
                <Button onClick={handlePublish} disabled={isUploading}>{isUploading ? "Publishing..." : "Publish Recipe"}</Button>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
