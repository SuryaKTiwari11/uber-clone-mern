import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Facebook,
  Instagram,
  Linkedin,
  Moon,
  Send,
  Sun,
  Twitter,
} from "lucide-react";

function Footerdemo() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [isChatOpen, setIsChatOpen] = React.useState(true);

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <footer className="relative border-t bg-white text-zinc-950 transition-all duration-500 ease-in-out dark:bg-zinc-950 dark:text-zinc-50">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative transform transition-all duration-300 hover:translate-y-[-5px]">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">
              Stay Connected
            </h2>
            <p className="mb-6 text-zinc-500 dark:text-zinc-400">
              Join our newsletter for the latest updates and exclusive offers.
            </p>
            <form className="relative">
              <Input
                type="email"
                placeholder="Enter your email"
                className="pr-12 backdrop-blur-sm transition-all duration-300 hover:shadow-md"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1 h-8 w-8 rounded-full bg-zinc-900 text-zinc-50 transition-all duration-300 hover:scale-110 hover:shadow-lg dark:bg-zinc-50 dark:text-zinc-900"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-zinc-900/10 blur-2xl transition-all duration-500 dark:bg-zinc-50/10" />
          </div>
          <div className="transform transition-all duration-300 hover:translate-y-[-5px]">
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <nav className="space-y-2 text-sm">
              <a
                href="#"
                className="block transition-all duration-200 hover:pl-2 hover:text-zinc-900 dark:hover:text-zinc-50"
              >
                Home
              </a>
              <a
                href="#"
                className="block transition-all duration-200 hover:pl-2 hover:text-zinc-900 dark:hover:text-zinc-50"
              >
                About Us
              </a>
              <a
                href="#"
                className="block transition-all duration-200 hover:pl-2 hover:text-zinc-900 dark:hover:text-zinc-50"
              >
                Services
              </a>
              <a
                href="#"
                className="block transition-all duration-200 hover:pl-2 hover:text-zinc-900 dark:hover:text-zinc-50"
              >
                Products
              </a>
              <a
                href="#"
                className="block transition-all duration-200 hover:pl-2 hover:text-zinc-900 dark:hover:text-zinc-50"
              >
                Contact
              </a>
            </nav>
          </div>
          <div className="transform transition-all duration-300 hover:translate-y-[-5px]">
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <address className="space-y-2 text-sm not-italic">
              <p className="transition-all duration-200 hover:pl-2">123 Innovation Street</p>
              <p className="transition-all duration-200 hover:pl-2">Tech City, TC 12345</p>
              <p className="transition-all duration-200 hover:pl-2">Phone: (123) 456-7890</p>
              <p className="transition-all duration-200 hover:pl-2">Email: hello@example.com</p>
            </address>
          </div>
          <div className="relative transform transition-all duration-300 hover:translate-y-[-5px]">
            <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
            <div className="mb-6 flex space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full transition-all duration-300 hover:rotate-[360deg] hover:scale-110"
                    >
                      <Facebook className="h-4 w-4" />
                      <span className="sr-only">Facebook</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Facebook</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full transition-all duration-300 hover:rotate-[360deg] hover:scale-110"
                    >
                      <Twitter className="h-4 w-4" />
                      <span className="sr-only">Twitter</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Twitter</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full transition-all duration-300 hover:rotate-[360deg] hover:scale-110"
                    >
                      <Instagram className="h-4 w-4" />
                      <span className="sr-only">Instagram</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Instagram</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full transition-all duration-300 hover:rotate-[360deg] hover:scale-110"
                    >
                      <Linkedin className="h-4 w-4" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Connect with us on LinkedIn</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4 transition-transform duration-300 hover:rotate-180" />
              <Switch
                id="dark-mode"
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
                className="transition-transform duration-300 hover:scale-110"
              />
              <Moon className="h-4 w-4 transition-transform duration-300 hover:rotate-180" />
              <Label htmlFor="dark-mode" className="sr-only">
                Toggle dark mode
              </Label>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center md:flex-row">
          <p className="text-sm text-zinc-500 transition-colors duration-300 dark:text-zinc-400">
            © 2024 Your Company. All rights reserved.
          </p>
          <nav className="flex gap-4 text-sm">
            <a
              href="#"
              className="transition-all duration-200 hover:scale-105 hover:text-zinc-900 dark:hover:text-zinc-50"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="transition-all duration-200 hover:scale-105 hover:text-zinc-900 dark:hover:text-zinc-50"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="transition-all duration-200 hover:scale-105 hover:text-zinc-900 dark:hover:text-zinc-50"
            >
              Cookie Settings
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export { Footerdemo };
