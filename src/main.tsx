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
import './styles/plan-sadnje.css';
import './styles/favorites.css';
import './styles/cart.css';
import './styles/profile.css';
import './styles/modal.css';
import './styles/loader.css';
import './styles/toast.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
