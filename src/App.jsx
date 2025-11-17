import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecetasProvider, useRecetas } from "./contexts/RecetasContext";
import Navbar from "./components/layout/Navbar";
import AgregarReceta from "./components/recetas/AgregarReceta";
import RecetasListPage from "./pages/RecetasListPage";
import RecetaDetallePage from "./pages/RecetaDetallePage";
import './App.css';

function AppContent() {
  const [mostrarForm, setMostrarForm] = useState(false);
  const { agregarReceta } = useRecetas();

  // ✅ nombre unificado
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);

    // ❗ tu CSS usa "dark", no "dark-mode"
    document.body.classList.toggle("dark", !isDarkMode);
  };

  const handleAgregarReceta = (nuevaReceta) => {
    agregarReceta(nuevaReceta);
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-[#242424] dark:text-white transition-colors duration-300">
      <Navbar 
        onAgregarReceta={() => setMostrarForm(true)}
        onToggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
      />

      <Routes>
        <Route path="/" element={<RecetasListPage />} />
        <Route path="/recetas/:id" element={<RecetaDetallePage />} />
      </Routes>
      
      <AgregarReceta
        open={mostrarForm}
        onClose={() => setMostrarForm(false)}
        onAgregarReceta={handleAgregarReceta}
      />
    </div>
  );
}

export default function App() {
  return (
    <RecetasProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </RecetasProvider>
  );
}
