import { Container, Typography } from "@mui/material";
import { useRecetas } from "../contexts/RecetasContext";
import RecetaList from "../components/recetas/RecetaList";

export default function RecetasListPage() {
  const { recetas } = useRecetas();

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Todas las Recetas ({recetas.length})
      </Typography>
      <RecetaList recetas={recetas} />
    </Container>
  );
}
