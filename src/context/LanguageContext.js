import React, { createContext, useState } from "react";

//1-createContext
export const LanguageContext = createContext();

//2-create ContextProvider component
export const LanguageContextProvider = ({ children }) => {
  //3- add state value to the provider children
  const [lang, setLang] = useState(
    localStorage.getItem("lang") ? localStorage.getItem("lang") : "en"
  );
  localStorage.setItem("lang", lang);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

//this file for handling language context in the app
