import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  IconButton,
  Box,
  Alert,
  Chip
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

export default function AgregarReceta({ open, onClose, onAgregarReceta }) {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    imagen: '',
    tiempoPreparacion: '',
    dificultad: '',
    porciones: '',
    categoria: '',
    ingredientes: [{ cantidad: '', unidad: '', nombre: '' }],
    pasos: ['']
  });

  const [errores, setErrores] = useState({});

  const validarFormulario = () => {
    const nuevosErrores = {};

    // Validar campos requeridos
    if (!formData.titulo.trim()) nuevosErrores.titulo = 'El título es requerido';
    if (!formData.descripcion.trim()) nuevosErrores.descripcion = 'La descripción es requerida';
    if (!formData.imagen.trim()) nuevosErrores.imagen = 'La imagen es requerida';
    if (!formData.tiempoPreparacion.trim()) nuevosErrores.tiempoPreparacion = 'El tiempo es requerido';
    if (!formData.dificultad.trim()) nuevosErrores.dificultad = 'La dificultad es requerida';
    if (!formData.porciones) nuevosErrores.porciones = 'Las porciones son requeridas';
    if (!formData.categoria.trim()) nuevosErrores.categoria = 'La categoría es requerida';

    // Validar ingredientes
    formData.ingredientes.forEach((ing, index) => {
      if (!ing.cantidad.trim() || !ing.nombre.trim()) {
        nuevosErrores.ingredientes = 'Todos los ingredientes deben tener cantidad y nombre';
      }
    });

    // Validar pasos
    formData.pasos.forEach((paso, index) => {
      if (!paso.trim()) {
        nuevosErrores.pasos = 'Todos los pasos son requeridos';
      }
    });

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleAgregar = () => {
    if (!validarFormulario()) {
      return;
    }

    const nuevaReceta = {
      id: Date.now(), // ID temporal
      ...formData,
      porciones: parseInt(formData.porciones)
    };

    onAgregarReceta(nuevaReceta);
    limpiarFormulario();
    onClose();
  };

  const limpiarFormulario = () => {
    setFormData({
      titulo: '',
      descripcion: '',
      imagen: '',
      tiempoPreparacion: '',
      dificultad: '',
      porciones: '',
      categoria: '',
      ingredientes: [{ cantidad: '', unidad: '', nombre: '' }],
      pasos: ['']
    });
    setErrores({});
  };

  const agregarIngrediente = () => {
    setFormData({
      ...formData,
      ingredientes: [...formData.ingredientes, { cantidad: '', unidad: '', nombre: '' }]
    });
  };

  const eliminarIngrediente = (index) => {
    if (formData.ingredientes.length > 1) {
      const nuevosIngredientes = formData.ingredientes.filter((_, i) => i !== index);
      setFormData({ ...formData, ingredientes: nuevosIngredientes });
    }
  };

  const actualizarIngrediente = (index, campo, valor) => {
    const nuevosIngredientes = formData.ingredientes.map((ing, i) =>
      i === index ? { ...ing, [campo]: valor } : ing
    );
    setFormData({ ...formData, ingredientes: nuevosIngredientes });
  };

  const agregarPaso = () => {
    setFormData({
      ...formData,
      pasos: [...formData.pasos, '']
    });
  };

  const eliminarPaso = (index) => {
    if (formData.pasos.length > 1) {
      const nuevosPasos = formData.pasos.filter((_, i) => i !== index);
      setFormData({ ...formData, pasos: nuevosPasos });
    }
  };

  const actualizarPaso = (index, valor) => {
    const nuevosPasos = formData.pasos.map((paso, i) =>
      i === index ? valor : paso
    );
    setFormData({ ...formData, pasos: nuevosPasos });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Agregar Nueva Receta</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {/* Campos básicos */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Título *"
              value={formData.titulo}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              error={!!errores.titulo}
              helperText={errores.titulo}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Descripción *"
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              error={!!errores.descripcion}
              helperText={errores.descripcion}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="URL de la imagen *"
              value={formData.imagen}
              onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
              error={!!errores.imagen}
              helperText={errores.imagen}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Categoría *"
              value={formData.categoria}
              onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
              error={!!errores.categoria}
              helperText={errores.categoria}
            />
          </Grid>

          <Grid item xs={6} sm={4}>
            <TextField
              fullWidth
              label="Tiempo *"
              value={formData.tiempoPreparacion}
              onChange={(e) => setFormData({ ...formData, tiempoPreparacion: e.target.value })}
              error={!!errores.tiempoPreparacion}
              helperText={errores.tiempoPreparacion}
            />
          </Grid>

          <Grid item xs={6} sm={4}>
            <TextField
              fullWidth
              label="Dificultad *"
              value={formData.dificultad}
              onChange={(e) => setFormData({ ...formData, dificultad: e.target.value })}
              error={!!errores.dificultad}
              helperText={errores.dificultad}
            />
          </Grid>

          <Grid item xs={6} sm={4}>
            <TextField
              fullWidth
              type="number"
              label="Porciones *"
              value={formData.porciones}
              onChange={(e) => setFormData({ ...formData, porciones: e.target.value })}
              error={!!errores.porciones}
              helperText={errores.porciones}
              inputProps={{ 
                min: 1, 
                max: 20,
                step: 1 
              }}
            />
          </Grid>

          {/* Ingredientes */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Chip
                label="Ingredientes *"
                color="default"
                sx={{ backgroundColor: "#E0E0E0" }}
              />
              <Button startIcon={<Add />} onClick={agregarIngrediente} 
                sx={{ ml: 2,
                  backgroundColor: "#43A047",
                  color: "white",
                  "&:hover": { backgroundColor: "#388E3C" }
                }}>
                  Agregar Ingrediente
              </Button>
            </Box>
            {errores.ingredientes && (
              <Alert severity="error" sx={{ mb: 2 }}>{errores.ingredientes}</Alert>
            )}
            
            {formData.ingredientes.map((ing, index) => (
              <Grid container spacing={1} key={index} sx={{ mb: 1 }}>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    size="small"
                    type="number"
                    label="Cantidad"
                    value={ing.cantidad}
                    onChange={(e) => actualizarIngrediente(index, 'cantidad', e.target.value)}
                    inputProps={{
                      min: 0,
                      step: 0.5,
                      style:{
                        MozAppearance: "texfield",
                        WebkitAppearance: "none",
                        appearance: "none",
                        margin:0
                      }
                    }}
                    sx= {{
                        "& input [type=number]":{
                            MozAppearance: 'textfield',
                            WebkitAppearance: 'none',
                            appearance: 'none',
                            margin: 0
                        },
                        '& input[type=number]::-webkit-outer-spin-button': {
                             WebkitAppearance: 'none',
                             margin: 0
                        },
                        '& input[type=number]::-webkit-inner-spin-button': {
                            WebkitAppearance: 'none',
                            margin: 0
                        }
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    size="small"
                    type="number"
                    label="Unidad"
                    value={ing.unidad}
                    onChange={(e) => actualizarIngrediente(index, 'unidad', e.target.value)}
                    inputProps={{ 
                        min: 0,
                        step: 1,
                        style: { 
                            MozAppearance: 'textfield',
                            WebkitAppearance: 'none',
                            appearance: 'none',
                            margin: 0
                        }
                    }}
                    sx={{
                        '& input[type=number]': {
                            MozAppearance: 'textfield',
                            WebkitAppearance: 'none',
                            appearance: 'none',
                            margin: 0
                        },
                        '& input[type=number]::-webkit-outer-spin-button': {
                            WebkitAppearance: 'none',
                            margin: 0
                        },
                        '& input[type=number]::-webkit-inner-spin-button': {
                        WebkitAppearance: 'none',
                        margin: 0
                        }
                    }}
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Nombre"
                    value={ing.nombre}
                    onChange={(e) => actualizarIngrediente(index, 'nombre', e.target.value)}
                  />
                </Grid>
                <Grid item xs={1}>
                  <IconButton 
                    onClick={() => eliminarIngrediente(index)}
                    disabled={formData.ingredientes.length === 1}
                  >
                    <Delete />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
          </Grid>

          {/* Pasos */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Chip
                label="Pasos de Preparación *"
                color="default"
                sx={{ backgroundColor: "#E0E0E0" }}
              />
              <Button startIcon={<Add />} onClick={agregarPaso}  sx={{
              ml: 2,
              backgroundColor: "#43A047",
              color: "white",
              "&:hover": { backgroundColor: "#388E3C" }
              }}>
                Agregar Paso
              </Button>
            </Box>
            {errores.pasos && (
              <Alert severity="error" sx={{ mb: 2 }}>{errores.pasos}</Alert>
            )}
            
            {formData.pasos.map((paso, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                <Chip label={index + 1} sx={{ mr: 1, mt: 1 }} />
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  size="small"
                  value={paso}
                  onChange={(e) => actualizarPaso(index, e.target.value)}
                  sx={{ flexGrow: 1 }}
                />
                <IconButton 
                  onClick={() => eliminarPaso(index)}
                  disabled={formData.pasos.length === 1}
                  sx={{ ml: 1, mt: 0.5 }}
                >
                  <Delete />
                </IconButton>
              </Box>
            ))}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
        onClick={onClose}
        sx={{
          backgroundColor: "#E57373",
          color: "white",
          "&:hover": { backgroundColor: "#D32F2F" }
        }}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleAgregar}
          variant="contained"
          sx={{
            backgroundColor: "#43A047",
            color: "white",
            "&:hover": { backgroundColor: "#388E3C" }
          }}
        >
          Agregar Receta
        </Button>
      </DialogActions>
    </Dialog>
  );
}