import React, { createContext, useContext, useState } from "react";

const isActiveContext = createContext();
export const ActiveContext = ({ children }) => {
  const [isActive, setIsActive] = useState(false);

  const handleActive = () => {
    setIsActive(!isActive);
  };

  const handleNotActive = () => {
    setIsActive(false)
  }
  return (
    <isActiveContext.Provider value={{ isActive, handleActive, handleNotActive }}>
      {children}
    </isActiveContext.Provider>
  );
};

export const useActive = () => {
  return useContext(isActiveContext);
};
