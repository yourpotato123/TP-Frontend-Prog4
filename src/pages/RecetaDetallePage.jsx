import { useParams } from "react-router-dom";
import { useRecetas } from "../contexts/RecetasContext";
import { Container, Typography } from "@mui/material";
import RecetaDetalle from "../components/recetas/RecetaDetalle";

export default function RecetaDetallePage() {
  const { id } = useParams();
  const { getRecetaById } = useRecetas();
  const receta = getRecetaById(id);

  if (!receta) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5">Receta no encontrada</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <RecetaDetalle receta={receta} />
    </Container>
  );
}