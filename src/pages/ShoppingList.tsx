/* PAGE: /shopping-list/:id */
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { Download, Mail, X, Plus, Minus } from "lucide-react";
import { toast } from "sonner";

interface Item {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  checked: boolean;
}

const mockItems: Item[] = [
  { id: "1", name: "Cherry tomatoes", quantity: 300, unit: "g", category: "Produce", checked: false },
  { id: "2", name: "Fresh basil", quantity: 1, unit: "bunch", category: "Produce", checked: false },
  { id: "3", name: "Garlic", quantity: 4, unit: "cloves", category: "Produce", checked: false },
  { id: "4", name: "Heavy cream", quantity: 200, unit: "ml", category: "Dairy", checked: false },
  { id: "5", name: "Parmesan cheese", quantity: 100, unit: "g", category: "Dairy", checked: false },
  { id: "6", name: "Pasta", quantity: 400, unit: "g", category: "Pantry", checked: false },
  { id: "7", name: "Olive oil", quantity: 3, unit: "tbsp", category: "Oils & Spices", checked: false },
];

export default function ShoppingList() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState(mockItems);

  const toggleItem = (itemId: string) => {
    setItems(prev =>
      prev.map(item => (item.id === itemId ? { ...item, checked: !item.checked } : item))
    );
  };

  const adjustQuantity = (itemId: string, delta: number) => {
    setItems(prev =>
      prev.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleDownload = () => {
    toast.success("Shopping list downloaded as PDF!");
  };

  const handleEmail = () => {
    toast.success("Shopping list sent to your email!");
  };

  const categories = Array.from(new Set(items.map(item => item.category)));
  const completedCount = items.filter(item => item.checked).length;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-background rounded-2xl shadow-strong max-w-2xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-heading font-bold">Shopping List</h2>
            <p className="text-muted-foreground">
              {completedCount} of {items.length} items checked
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="btn-scale"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Items */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {categories.map(category => (
            <div key={category} className="mb-6">
              <h3 className="text-lg font-heading font-semibold mb-3 text-primary">
                {category}
              </h3>
              <div className="space-y-2">
                {items
                  .filter(item => item.category === category)
                  .map(item => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                        item.checked ? "bg-muted/50" : "bg-muted/20 hover:bg-muted/40"
                      }`}
                    >
                      <Checkbox
                        id={item.id}
                        checked={item.checked}
                        onCheckedChange={() => toggleItem(item.id)}
                      />
                      <label
                        htmlFor={item.id}
                        className={`flex-1 cursor-pointer ${
                          item.checked ? "line-through opacity-60" : ""
                        }`}
                      >
                        <span className="font-medium">{item.name}</span>
                      </label>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => adjustQuantity(item.id, -1)}
                          className="h-8 w-8"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm text-muted-foreground min-w-[60px] text-center">
                          {item.quantity} {item.unit}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => adjustQuantity(item.id, 1)}
                          className="h-8 w-8"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t flex items-center justify-between">
          <div className="flex gap-3">
            <Button onClick={handleDownload} variant="outline" className="btn-scale">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            <Button onClick={handleEmail} variant="outline" className="btn-scale">
              <Mail className="mr-2 h-4 w-4" />
              Email List
            </Button>
          </div>
          <Button onClick={() => navigate(-1)} className="btn-scale">
            Close
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
