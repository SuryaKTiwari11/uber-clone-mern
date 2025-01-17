import React from "react";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";
import { RetroGrid } from "@/components/ui/retro-grid";

import Navbar from "./Navbar";

const Start = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <div className="relative flex h-screen w-full items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
        <span className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b  from-[#000000] via-[#000000] to-[#000000] bg-clip-text text-center text-7xl font-bold leading-none tracking-tighter text-transparent  p-1">
          Swift Cabs
        </span>

        <RetroGrid />
      </div>
     
    </>
  );
};

export default Start;
