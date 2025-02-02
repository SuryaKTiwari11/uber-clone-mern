import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { RetroGrid } from "../components/ui/retro-grid";
import { TextAnimate } from "@/components/ui/text-animate";
import { RainbowButton } from "@/components/ui/rainbow-button";
import Navbar from "./Navbar";
import gsap from "gsap";

const Start = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    // Initial setup
    gsap.set([titleRef.current, subtitleRef.current, buttonRef.current], {
      opacity: 0,
      y: 50,
    });

    // Entrance animation timeline
    const tl = gsap.timeline();

    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power4.out",
    })
      .to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5"
      )
      .to(
        buttonRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      );

    // Floating animation for title
    gsap.to(titleRef.current, {
      y: "+=10",
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Glowing effect for button
    gsap.to(buttonRef.current, {
      boxShadow: "0 0 20px rgba(255,255,255,0.8)",
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <RetroGrid />
      <div
        className={`relative flex flex-col h-screen w-full items-center justify-center overflow-hidden rounded-lg border transition-colors duration-500 ${
          isDarkMode ? "bg-dark-background" : "bg-background"
        }`}
      >
        <h1
          ref={titleRef}
          className="
          text-center text-8xl font-extrabold text-black bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        >
          Swift Cab
        </h1>
        <div ref={subtitleRef}>
          <TextAnimate
            animation="blurInUp"
            by="character"
            className="
            text-center text-3xl font-medium text-gray-700 mt-8
            transition-all duration-300 hover:scale-105
            "
          >
            Hope in lil bro, we&apos;re going places!
          </TextAnimate>
        </div>
        <div ref={buttonRef}>
          <Link to="/users-login">
            <RainbowButton className="mt-6 p-2 size-large w-40 h-12 text-xl font-semibold transform hover:scale-110 transition-all duration-300 ease-out hover:rotate-2">
              Get Started
            </RainbowButton>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Start;
