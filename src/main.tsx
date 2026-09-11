import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './styles/variables.css';
import './styles/components.css';
import './styles/auth.css';
import './styles/home.css';
import './styles/catalog.css';
import './styles/plant-detail.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
