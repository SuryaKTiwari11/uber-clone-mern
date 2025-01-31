import React from "react";
import { Link } from "react-router-dom";
import { RetroGrid } from "../components/ui/retro-grid";
import { TextAnimate } from "@/components/ui/text-animate";
import { RainbowButton } from "@/components/ui/rainbow-button";
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
      <RetroGrid />
      <div
        className={`relative flex flex-col h-screen w-full items-center justify-center overflow-hidden rounded-lg border transition-colors duration-500 ${
          isDarkMode ? "bg-dark-background" : "bg-background"
        }`}
      >
        <h1 className="text-center text-8xl font-extrabold text-black ">
          Swift Cab
        </h1>
        <TextAnimate
          animation="blurInUp"
          by="character"
          className="text-center text-3xl font-medium text-gray-700 mt-6"
        >
          Hope in lil bro, we&apos;re going places!
        </TextAnimate>
        <Link to="/users-login">
          <RainbowButton className="mt-6 p-2 size-large w-40 h-12 text-xl font-semibold transform hover:scale-105 transition-transform duration-4000 ease-in-out">
            Get Started
          </RainbowButton>
        </Link>
      </div>
    </>
  );
};

export default Start;
