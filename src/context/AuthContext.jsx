import { createContext, useEffect } from "react"
import { useState } from "react";
import { refreshToken } from "../utils/api";


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() =>
    async () => {
      // console.log("===================fetching user=====================")
      try {
        const localUser = JSON.parse(localStorage.getItem("user"));
        if (!localUser) {
          return;
        }
        const newUser = await refreshToken(localUser.refreshToken);
        if (newUser.status === 200) {
          const userData = newUser.data.data.logedInUser;
          userData.accessToken = newUser.data.data.accessToken;
          userData.refreshToken = newUser.data.data.refreshToken;
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
          // console.log("updated User : ", userData)
        }
      } catch (error) {
        console.error("Error refreshing user:", error);
        setUser(null);
      }
    }
    , [])
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
