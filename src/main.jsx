import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { ThemeProvider } from './context/TheamContect.jsx'
import { SearchProvider } from './context/SearchContext.jsx'



createRoot(document.getElementById('root')).render(

  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider >
          <SearchProvider>
            <App />
          </SearchProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)


/*
  
*/