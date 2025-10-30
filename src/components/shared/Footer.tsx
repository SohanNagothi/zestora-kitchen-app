import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChefHat, Twitter, Instagram, Youtube, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Generate Recipe", path: "/generate" },
    { name: "Upload Recipe", path: "/upload" },
    { name: "Explore", path: "/explore" },
    { name: "My Recipes", path: "/my-recipes" },
  ];

  const companyLinks = [
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "FAQ", path: "/faq" },
  ];

  const legalLinks = [
    { name: "Terms of Service", path: "/terms" },
    { name: "Privacy Policy", path: "/privacy" },
  ];

  return (
    <footer className="bg-foreground text-background mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="rounded-xl bg-gradient-primary p-2">
                <ChefHat className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-heading font-bold text-background">
                Zestora
              </span>
            </Link>
            <p className="text-background/70 mb-4">
              Cook smart with what you have. Transform your ingredients into delicious recipes with AI-powered suggestions.
            </p>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-background/70 hover:text-background hover:bg-primary"
                asChild
              >
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-background/70 hover:text-background hover:bg-primary"
                asChild
              >
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-background/70 hover:text-background hover:bg-primary"
                asChild
              >
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <Youtube className="h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-background/70 hover:text-background hover:bg-primary"
                asChild
              >
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-background/70">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>
                  Zestora Labs<br />
                  12A, Marine Lines<br />
                  Mumbai 400020, India
                </span>
              </li>
              <li className="flex items-center gap-2 text-background/70">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <div>
                  <div>+91 88502 75528</div>
                  <div>+91 88210 77077</div>
                </div>
              </li>
              <li className="flex items-center gap-2 text-background/70">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <a href="mailto:zestora123@gmail.com" className="hover:text-background">
                  zestora123@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/70 text-sm">
            © 2025 Zestora Labs. All rights reserved.
          </p>
          <div className="flex gap-4">
            {legalLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-background/70 hover:text-background text-sm transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
