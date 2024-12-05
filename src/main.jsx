import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

if (import.meta.env.MODE === "development") {
  console.log = function () {};
  console.warn = function () {};
  console.error = function () {};
  console.info = function () {};
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
