import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import icon2 from './assets/icon2.png'

const faviconElement = document.querySelector("link[rel='icon']")
if (faviconElement) {
  faviconElement.href = icon2
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
