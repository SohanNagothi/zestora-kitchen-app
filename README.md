# Zestora - Cook Smart with What You Have

A modern, AI-powered recipe generation platform built with React, TypeScript, and Tailwind CSS.

## Features

- 🎨 **Beautiful UI** - Warm, food-focused design with glassmorphism and micro-interactions
- 🔐 **Authentication** - Login/Signup with email or social providers (Google, Apple)
- 🍳 **Recipe Generation** - AI-powered recipe suggestions based on your ingredients
- 🏷️ **Smart Tagging** - Easy ingredient input with tag-based interface
- 🚫 **Allergy-Aware** - Set dietary restrictions and get safe recipes
- ❤️ **Save Recipes** - Save your favorite recipes for later
- 📱 **Fully Responsive** - Works perfectly on mobile, tablet, and desktop
- 🌙 **Dark Mode** - Toggle between light and dark themes
- ✨ **Animations** - Smooth transitions, card flips, and shimmer loaders

## Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI primitives (Button, Input, Card, etc.)
│   └── shared/          # Shared components (Header, Footer, RecipeCard)
├── pages/               # Route pages
│   ├── Landing.tsx      # Home page with hero
│   ├── Login.tsx        # Login page
│   ├── Signup.tsx       # Signup page
│   ├── Generate.tsx     # Recipe generation (core feature)
│   ├── MyRecipes.tsx    # User's saved/uploaded recipes
│   ├── Explore.tsx      # Browse recipes
│   ├── Profile.tsx      # User profile
│   └── About.tsx        # About page
├── data/
│   └── mockRecipes.ts   # Sample recipe data for preview
├── lib/
│   └── hooks/
│       └── useAuth.tsx  # Authentication context and logic
└── assets/              # Generated images
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <YOUR_GIT_URL>
cd zestora
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:8080](http://localhost:8080) in your browser

## Demo Credentials

For testing the authentication:
- **Email:** demo@zestora.test
- **Password:** demopass

## Design System

### Colors (HSL)

- **Primary (Zesty Orange):** `hsl(14 100% 67%)` - #FF7B54
- **Secondary (Fresh Mint):** `hsl(162 46% 54%)` - #56BFA3
- **Accent (Blue):** `hsl(205 92% 44%)` - #0D74CE
- **Background:** `hsl(42 100% 98%)` - #F8FAF5

### Typography

- **Headings:** Poppins (400, 500, 600, 700)
- **Body:** Inter (300, 400, 500, 600)

### Key Features

- **Gradients:** Primary and secondary gradients defined in CSS variables
- **Shadows:** Soft, medium, and strong shadow system
- **Animations:** Shimmer, fade-in, scale-in, float, and card flip effects
- **Border Radius:** Generous rounded corners (1rem default)

## Mock API Integration

The app currently uses mock data for demonstration. To integrate with a real backend:

### Recipe Generation

Replace the mock logic in `src/pages/Generate.tsx`:

```typescript
// Current mock implementation
const handleGenerate = async () => {
  // ... filtering logic
};

// Replace with:
const handleGenerate = async () => {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ingredients,
      allergies: selectedAllergies,
      cuisine,
      maxCookTime: maxCookTime[0],
    }),
  });
  const data = await response.json();
  setRecipes(data.recipes);
};
```

### Authentication

Update `src/lib/hooks/useAuth.tsx` to call your authentication endpoints:

```typescript
// Replace mock login/signup/socialLogin functions
const login = async (email: string, password: string) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  setUser(data.user);
  localStorage.setItem('token', data.token);
};
```

## Contact Details

All footer contact information uses these exact details:

**Zestora Labs**  
12A, Marine Lines  
Mumbai 400020, India

**Phone:** +91 22 1234 5678  
**Mobile:** +91 98765 43210  
**Email:** contact@zestora.example

To change these details, edit `src/components/shared/Footer.tsx`.

## Building for Production

```bash
npm run build
```

The build output will be in the `dist/` directory, ready to deploy to any static hosting service.

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - UI component library
- **React Router** - Client-side routing
- **Lucide React** - Icon library
- **Sonner** - Toast notifications

## License

© 2025 Zestora Labs. All rights reserved.
