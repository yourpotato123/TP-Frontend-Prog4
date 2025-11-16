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

  const handleAgregarReceta = (nuevaReceta) => {
    agregarReceta(nuevaReceta);
  };

  return (
    <>
      <Navbar onAgregarReceta={() => setMostrarForm(true)} />
      <Routes>
        <Route path="/" element={<RecetasListPage />} />
        <Route path="/recetas/:id" element={<RecetaDetallePage />} />
      </Routes>
      
      <AgregarReceta
        open={mostrarForm}
        onClose={() => setMostrarForm(false)}
        onAgregarReceta={handleAgregarReceta}
      />
    </>
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