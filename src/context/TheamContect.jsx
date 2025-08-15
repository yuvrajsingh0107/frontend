
import React from "react";

// step 1
// create a context for the theme
const ThemeContext = React.createContext();


// step 2
// create a provider for the theme
// and initilize time state in it

const ThemeProvider = ({children}) => {
  const [theme, setTheme] = React.useState("dark");

   return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      {children}
    </ThemeContext.Provider>
   )
}

export default ThemeContext;
export { ThemeProvider };