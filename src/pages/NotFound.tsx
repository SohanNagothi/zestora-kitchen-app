/* PAGE: /404 */
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Home, ChefHat } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="mb-8">
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block"
          >
            <ChefHat className="h-24 w-24 text-primary mx-auto mb-4" />
          </motion.div>
          <h1 className="text-8xl font-heading font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-3xl font-heading font-bold mb-4">Recipe Not Found</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Oops! Looks like this recipe got burned. Let's get you back to something tasty.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => navigate(-1)} variant="outline" className="btn-scale">
            Go Back
          </Button>
          <Button onClick={() => navigate("/")} className="btn-scale">
            <Home className="mr-2 h-5 w-5" />
            Back to Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
