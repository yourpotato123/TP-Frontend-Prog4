import { createContext, useContext, useState, useEffect } from 'react';
import recetasData from '../data/recetas.json';

const RecetasContext = createContext();

export function RecetasProvider({ children }) {
  const [recetas, setRecetas] = useState([]);

  useEffect(() => {
    // Simular carga de datos
    setRecetas(recetasData);
  }, []);

  const getRecetaById = (id) => {
    return recetas.find(receta => receta.id === Number(id));
  };

 const agregarReceta = (nuevaReceta) => {
    setRecetas(prevRecetas => [...prevRecetas, nuevaReceta]);
  };

  const value = {
    recetas,
    getRecetaById,
    agregarReceta
  };

  return (
    <RecetasContext.Provider value={value}>
      {children}
    </RecetasContext.Provider>
  );
}

export function useRecetas() {
  const context = useContext(RecetasContext);
  if (!context) {
    throw new Error('useRecetas debe usarse dentro de RecetasProvider');
  }
  return context;
}