import React from "react";
import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";

const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <nav className="fixed top-0 w-full bg-white dark:bg-zinc-950 shadow-md z-50 transition-all duration-700">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 hover:scale-105 transition-transform duration-300"
        >
          Swift Cabs
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="text-zinc-900 dark:text-zinc-50 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 transform hover:scale-105"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-zinc-900 dark:text-zinc-50 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 transform hover:scale-105"
          >
            About Us
          </Link>
          <Link
            to="/services"
            className="text-zinc-900 dark:text-zinc-50 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 transform hover:scale-105"
          >
            Services
          </Link>
          <Link
            to="/contact"
            className="text-zinc-900 dark:text-zinc-50 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 transform hover:scale-105"
          >
            Contact
          </Link>
          <div className="flex items-center space-x-2 animate-fade-in">
            <Sun className="h-4 w-4 text-zinc-900 dark:text-zinc-50 transition-transform duration-300 hover:rotate-180" />
            <Switch
              id="dark-mode"
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
              className="transition-transform duration-300 hover:scale-110"
            />
            <Moon className="h-4 w-4 text-zinc-900 dark:text-zinc-50 transition-transform duration-300 hover:rotate-180" />
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
