import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Upload, Sparkles, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function FAB() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const actions = [
    { icon: Sparkles, label: "Generate Recipe", path: "/generate" },
    { icon: Upload, label: "Upload Recipe", path: "/upload" },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 md:hidden">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-16 right-0 space-y-3"
          >
            {actions.map((action, index) => (
              <motion.div
                key={action.path}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <span className="text-sm font-medium bg-background px-3 py-1 rounded-full shadow-medium whitespace-nowrap">
                  {action.label}
                </span>
                <Button
                  onClick={() => {
                    navigate(action.path);
                    setIsOpen(false);
                  }}
                  size="icon"
                  className="h-12 w-12 rounded-full shadow-strong"
                >
                  <action.icon className="h-5 w-5" />
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="h-14 w-14 rounded-full bg-gradient-primary text-white shadow-strong flex items-center justify-center"
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
        </motion.div>
      </motion.button>
    </div>
  );
}
