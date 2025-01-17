import React, { createContext, useState, useContext } from "react";

// Create the context
export const CaptainDataContext = createContext();

// Create a provider component
export const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updateCaptain, setUpdateCaptain] = useState(false);
  const value = [
    captain,
    setCaptain,
    isLoading,
    setIsLoading,
    error,
    setError,
    updateCaptain,
    setUpdateCaptain,
  ];

  return (
    <CaptainDataContext.Provider value={{ captain, setCaptain }}>
      {children}
    </CaptainDataContext.Provider>
  );
};

// Create a custom hook to use the CaptainContext
export default CaptainContext;
