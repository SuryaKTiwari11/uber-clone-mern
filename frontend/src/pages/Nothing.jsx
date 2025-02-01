import React from "react";
import { Link } from "react-router-dom";
import { RetroGrid } from "../components/ui/retro-grid";

const Nothing = () => {
  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-center relative">
        <RetroGrid />
        <h1
          className="
          text-9xl font-bold text-gray-900 z-10
          "
        >
          404
        </h1>
        <p
          className="
          text-2xl font-bold text-gray-800 z-10
          "
        >
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          to="/"
          className="
          text-xl font-bold text-blue-800 z-10
          "
        >
          Go back to Home
        </Link>
      </div>
    </>
  );
};

export default Nothing;
