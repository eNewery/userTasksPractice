"use client"
import React, { createContext } from 'react';
const MiContexto = createContext();
const MiContextoProvider = ({ children }) => {

  
  
      
    return (
      <MiContexto.Provider value={{}}>
        {children}
      </MiContexto.Provider>
    );
  };
  export { MiContexto, MiContextoProvider };