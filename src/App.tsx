import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { PlantDetail } from './pages/PlantDetail';
import { PlanSadnje } from './pages/PlanSadnje';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="app">
          <Navbar />
          <main style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1rem' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/katalog" element={<Catalog />} />
              <Route path="/katalog/:id" element={<PlantDetail />} />
              <Route path="/plan-sadnje" element={<PlanSadnje />} />
              <Route path="/prijava" element={<Login />} />
              <Route path="/registracija" element={<Register />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;