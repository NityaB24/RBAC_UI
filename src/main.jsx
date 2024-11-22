import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RBACProvider } from './contexts/RBACContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RBACProvider>
      <App />
    </RBACProvider>
  </StrictMode>,
)
