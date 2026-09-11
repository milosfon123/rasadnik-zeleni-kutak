import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { PlantDetail } from './pages/PlantDetail';
import { PlanSadnje } from './pages/PlanSadnje';
import { Favorites } from './pages/Favorites';
import { Cart } from './pages/Cart';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

// Zaštićena komponenta za rute kojima se pristupa samo uz prijavu
import React from 'react'; // proveri da li je React uvezen na vrhu fajla

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useApp();
  if (!user) {
    return <Navigate to="/prijava" replace />;
  }
  return <>{children}</>;
};

function AppRoutes() {
  return (
    <div className="app">
      <Navbar />
      <main style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/katalog" element={<Catalog />} />
          <Route path="/katalog/:id" element={<PlantDetail />} />
          <Route 
            path="/plan-sadnje" 
            element={
              <ProtectedRoute>
                <PlanSadnje />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/omiljene" 
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/korpa" 
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } 
          />
          <Route path="/profil" element={<Profile />} />
          <Route path="/prijava" element={<Login />} />
          <Route path="/registracija" element={<Register />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;