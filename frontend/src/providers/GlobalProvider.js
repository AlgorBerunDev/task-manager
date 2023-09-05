import React, { useState } from "react";
import GlobalContext from "./GlobalContext";

const GlobalProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState({ user: null });

  const setUser = user => {
    setGlobalState({ ...globalState, user });
  };

  const removeUser = () => {
    setGlobalState({ ...globalState, user: null });
  };

  return <GlobalContext.Provider value={{ globalState, setUser, removeUser }}>{children}</GlobalContext.Provider>;
};

export default GlobalProvider;
