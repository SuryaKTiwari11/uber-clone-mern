import React from "react";
import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <nav className="fixed top-0 w-full bg-white dark:bg-zinc-950 shadow-md z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-zinc-900 dark:text-zinc-50"
        >
          Swift Cabs
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="text-zinc-900 dark:text-zinc-50 hover:underline"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-zinc-900 dark:text-zinc-50 hover:underline"
          >
            About Us
          </Link>
          <Link
            to="/services"
            className="text-zinc-900 dark:text-zinc-50 hover:underline"
          >
            Services
          </Link>
          <Link
            to="/contact"
            className="text-zinc-900 dark:text-zinc-50 hover:underline"
          >
            Contact
          </Link>
          <div className="flex items-center space-x-2">
            <Sun className="h-4 w-4" />
            <Switch
              id="dark-mode"
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
            />
            <Moon className="h-4 w-4" />
            <Label htmlFor="dark-mode" className="sr-only">
              Toggle dark mode
            </Label>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
