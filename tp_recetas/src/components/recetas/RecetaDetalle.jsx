import { Typography, Box, Paper } from "@mui/material";
import IngredientesList from "./IngredientesList";

export default function RecetaDetalle({ receta }) {
  if (!receta) return <Typography>No se encontró la receta.</Typography>;

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h3" gutterBottom>
        {receta.titulo}
      </Typography>

      <Box
        component="img"
        src={receta.imagen}
        alt={receta.titulo}
        sx={{ 
          width: "100%", 
          maxWidth: 500, 
          borderRadius: 2, 
          mb: 3 
        }}
      />

      <Typography variant="body1" sx={{ mb: 2, fontSize: "1.1rem" }}>
        {receta.descripcion}
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography><strong>Tiempo:</strong> {receta.tiempoPreparacion}</Typography>
        <Typography><strong>Dificultad:</strong> {receta.dificultad}</Typography>
        <Typography><strong>Porciones:</strong> {receta.porciones}</Typography>
      </Box>

      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h5" gutterBottom>Ingredientes</Typography>
        <IngredientesList ingredientes={receta.ingredientes} />
      </Paper>

      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Pasos</Typography>
        <ol>
          {receta.pasos.map((paso, i) => (
            <li key={i} style={{ marginBottom: "10px" }}>
              <Typography>{paso}</Typography>
            </li>
          ))}
        </ol>
      </Paper>
    </Box>
  );
}