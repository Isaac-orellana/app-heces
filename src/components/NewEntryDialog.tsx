import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { useStore } from '../store';

interface NewEntryDialogProps {
  open: boolean;
  onClose: () => void;
  selectedDate?: Date;
}

export default function NewEntryDialog({ open, onClose, selectedDate }: NewEntryDialogProps) {
  const [date, setDate] = React.useState<Date | null>(selectedDate || new Date());
  const [type, setType] = React.useState<'rabbit' | 'goat' | 'cow' | 'seagull'>('cow');
  const [color, setColor] = React.useState<string>('brown');
  const [experience, setExperience] = React.useState<'excellent' | 'good' | 'difficult' | 'very_difficult'>('good');
  const [characteristics, setCharacteristics] = React.useState({
    blood: false,
    floating: false,
    mucus: false,
    gas: false,
  });
  
  const addEntry = useStore((state) => state.addEntry);

  React.useEffect(() => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  }, [selectedDate]);

  const handleSubmit = () => {
    if (date) {
      addEntry({
        date,
        type,
        color,
        experience,
        characteristics,
      });
      onClose();
      
      // Reset form
      setType('cow');
      setColor('brown');
      setExperience('good');
      setCharacteristics({
        blood: false,
        floating: false,
        mucus: false,
        gas: false,
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Nueva Entrada</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <DateTimePicker
              label="Fecha y Hora"
              value={date}
              onChange={(newValue) => setDate(newValue)}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography gutterBottom>Tipo</Typography>
            <ToggleButtonGroup
              value={type}
              exclusive
              onChange={(event, value) => value && setType(value)}
              fullWidth
            >
              <ToggleButton value="rabbit">🐰</ToggleButton>
              <ToggleButton value="goat">🐐</ToggleButton>
              <ToggleButton value="cow">🐮</ToggleButton>
              <ToggleButton value="seagull">🦅</ToggleButton>
            </ToggleButtonGroup>
          </Grid>

          <Grid item xs={12}>
            <Typography gutterBottom>Color</Typography>
            <ToggleButtonGroup
              value={color}
              exclusive
              onChange={(event, value) => value && setColor(value)}
              fullWidth
            >
              <ToggleButton value="brown">Marroncito</ToggleButton>
              <ToggleButton value="darkBrown">Chocolate</ToggleButton>
              <ToggleButton value="lightBrown">Cafecito</ToggleButton>
              <ToggleButton value="yellow">Mostaza</ToggleButton>
            </ToggleButtonGroup>
          </Grid>

          <Grid item xs={12}>
            <Typography gutterBottom>Experiencia</Typography>
            <ToggleButtonGroup
              value={experience}
              exclusive
              onChange={(event, value) => value && setExperience(value)}
              fullWidth
            >
              <ToggleButton value="excellent">😌</ToggleButton>
              <ToggleButton value="good">😊</ToggleButton>
              <ToggleButton value="difficult">😫</ToggleButton>
              <ToggleButton value="very_difficult">😖</ToggleButton>
            </ToggleButtonGroup>
          </Grid>

          <Grid item xs={12}>
            <Typography gutterBottom>Características</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <ToggleButton
                  value="blood"
                  selected={characteristics.blood}
                  onChange={() => setCharacteristics(prev => ({ ...prev, blood: !prev.blood }))}
                  fullWidth
                >
                  🩸 Sangre
                </ToggleButton>
              </Grid>
              <Grid item xs={6}>
                <ToggleButton
                  value="floating"
                  selected={characteristics.floating}
                  onChange={() => setCharacteristics(prev => ({ ...prev, floating: !prev.floating }))}
                  fullWidth
                >
                  🎈 Flotante
                </ToggleButton>
              </Grid>
              <Grid item xs={6}>
                <ToggleButton
                  value="mucus"
                  selected={characteristics.mucus}
                  onChange={() => setCharacteristics(prev => ({ ...prev, mucus: !prev.mucus }))}
                  fullWidth
                >
                  💫 Mucosidad
                </ToggleButton>
              </Grid>
              <Grid item xs={6}>
                <ToggleButton
                  value="gas"
                  selected={characteristics.gas}
                  onChange={() => setCharacteristics(prev => ({ ...prev, gas: !prev.gas }))}
                  fullWidth
                >
                  💨 Gases
                </ToggleButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}