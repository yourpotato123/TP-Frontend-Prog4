import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";

export default function Navbar({ onAgregarReceta }) {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          🍝 Mis Recetas
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            color="inherit" 
            startIcon={<Add />}
            onClick={onAgregarReceta}
          >
            Agregar Receta
          </Button>
          <Button color="inherit" onClick={() => navigate('/')}>
            Inicio
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}