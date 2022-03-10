import React, { createContext, useState, useEffect } from "react";

//1-createContext
export const LogingContext = createContext();

//2-create ContextProvider component
export const LogingContextProvider = ({ children }) => {
  //3- add state value to the provider children
  const [is_loged, setLogging] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [userRole, setUserRole] = useState("");

  return (
    <LogingContext.Provider
      value={{ is_loged, setLogging, userRole, setUserRole }}
    >
      {children}
    </LogingContext.Provider>
  );
};

//this file for handling language context in the app
