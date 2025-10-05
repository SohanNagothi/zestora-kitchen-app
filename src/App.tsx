import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/hooks/useAuth";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Onboarding from "./pages/Onboarding";
import Generate from "./pages/Generate";
import RecipeDetail from "./pages/RecipeDetail";
import Upload from "./pages/Upload";
import EditRecipe from "./pages/EditRecipe";
import MyRecipes from "./pages/MyRecipes";
import Explore from "./pages/Explore";
import Search from "./pages/Search";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Preferences from "./pages/Preferences";
import Notifications from "./pages/Notifications";
import ShoppingList from "./pages/ShoppingList";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/generate" element={<Generate />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/my-recipes" element={<MyRecipes />} />
            <Route path="/my-recipes/:id/edit" element={<EditRecipe />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/search" element={<Search />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/preferences" element={<Preferences />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/shopping-list/:id" element={<ShoppingList />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
