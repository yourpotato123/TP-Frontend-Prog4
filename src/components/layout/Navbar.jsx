import { AppBar, Toolbar, Typography, Button, Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";

export default function Navbar({ onAgregarReceta, onToggleDarkMode, isDarkMode }) 
 {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1E88E5" }}>
      <Toolbar>
        <Typography 
          variant="h6" 
          sx={{
            flexGrow: 1,
            cursor: "pointer",
            transition: "0.2s",
            "&:hover": { color: "#BBDEFB" }
          }}
          onClick={() => navigate('/')}
        >
          🍝 Mis Recetas
        </Typography>
        
        <Box sx={{ display: "flex", gap: 2 }}>
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

          {/* 🌙 Modo oscuro con giro y visibilidad OK */}
          <IconButton
            onClick={onToggleDarkMode}
            sx={{
              color: "white",
              fontSize: "1.4rem",
              animation: "spin 0.4s ease",
              "@keyframes spin": {
                "0%": { transform: "rotate(0deg)" },
                "100%": { transform: "rotate(360deg)" }
              }
            }}
          >
            {isDarkMode ? "🌞" : "🌙"}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
