import { List, ListItem, ListItemText } from "@mui/material";

export default function IngredientesList({ ingredientes }) {
  if (!ingredientes || ingredientes.length === 0) {
    return <p>No hay ingredientes disponibles</p>;
  }

  return (
    <List>
      {ingredientes.map((ing, index) => (
        <ListItem key={index} sx={{ padding: "0.3rem 0" }}>
          <ListItemText 
            primary={`${ing.cantidad} ${ing.unidad} - ${ing.nombre}`}
          />
        </ListItem>
      ))}
    </List>
  );
}
