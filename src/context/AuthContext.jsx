import {createContext} from "react"
import { useState } from "react";


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const localUser = localStorage.getItem("user");
    if(localUser) return JSON.parse(localUser);
    return null;
  });
  return (
    <AuthContext.Provider value={{ user, setUser }}>  
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
