import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { registerSW } from 'virtual:pwa-register'

// Auto-update service worker immediately on new releases
registerSW({ immediate: true })


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
)
