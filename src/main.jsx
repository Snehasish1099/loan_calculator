import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { ThemeProviderWrapper } from './context/ThemeContext';
import { CurrencyProvider } from './context/CurrencyContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProviderWrapper>
        <CurrencyProvider>
          <App />
        </CurrencyProvider>
      </ThemeProviderWrapper>
    </BrowserRouter>
  </StrictMode>,
)
