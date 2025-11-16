import RecetaCard from "./RecetaCard";
import recetas from "../../data/recetas.json"


export default function RecetaList({ recetas }) {
  if (!recetas || recetas.length === 0) return <p>No hay recetas disponibles</p>;

  return (
    <div style={{ 
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "1rem",
      padding: "1rem"
    }}>
      {recetas.map((r) => (
        <RecetaCard key={r.id} receta={r} />
      ))}
    </div>
  );
}


