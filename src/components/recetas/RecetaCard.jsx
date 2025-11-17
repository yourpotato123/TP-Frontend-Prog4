import { Card, CardMedia, CardContent, Typography, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Visibility } from "@mui/icons-material";

export default function RecetaCard({ receta }) {
  console.log("Receta en Card:", receta);
  const navigate = useNavigate();
  
  const handleVerDetalle = () => {
    console.log("Navegando a receta", receta.id); 
    navigate(`/recetas/${receta.id}`);
  };

  return (
    <Card>
      {/* Hacer la imagen clickeable */}
      <IconButton 
        onClick={handleVerDetalle}
        sx={{ 
          padding: 0, 
          width: '100%',
          '&:hover': {
            opacity: 0.8
          }
        }}
      >
        <CardMedia
          component="img"
          image={receta?.imagen}
          height="200"
          alt={receta?.titulo}
          sx={{ 
            cursor: 'pointer',
            transition: 'opacity 0.3s'
          }}
        />
      </IconButton>

      <CardContent>
        <Typography variant="h5" gutterBottom>
          {receta?.titulo}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {receta?.descripcion}
        </Typography>
      </CardContent>

      <Button  
        variant="contained"
        startIcon={<Visibility />}
        onClick={handleVerDetalle}
        sx={{
        backgroundColor: "#43A047",
        ":hover": { backgroundColor: "#2E7D32" },
        m: 2   // ← agregado aquí
        }}
      >
  Ver más
</Button>
    </Card>
  );
}