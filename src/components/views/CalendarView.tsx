import React from 'react';
import { Paper, Typography, Grid, Button, Box, Fade, useMediaQuery, useTheme } from '@mui/material';
import Calendar from 'react-calendar';
import type { Value } from 'react-calendar';
import { useStore } from '../../store';
import 'react-calendar/dist/Calendar.css';

export default function CalendarView() {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const { entries, addEntry } = useStore();
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const [showOptions, setShowOptions] = React.useState(false);
  const [selectedType, setSelectedType] = React.useState<'rabbit' | 'goat' | 'cow' | 'seagull'>('cow');
  const [selectedColor, setSelectedColor] = React.useState<string>('brown');
  const [selectedExperience, setSelectedExperience] = React.useState<'excellent' | 'good' | 'difficult' | 'very_difficult'>('good');
  const [characteristics, setCharacteristics] = React.useState({
    blood: false,
    floating: false,
    mucus: false,
    gas: false,
  });
  const [showSaveNotification, setShowSaveNotification] = React.useState(false);

  const consistencyTypes = [
    { type: 'rabbit', emoji: '🐰', description: '¡Qué durillas, como bolitas!', color: '#FFB6C1' },
    { type: 'goat', emoji: '🐐', description: 'Perfectas: suaves y alargadas', color: '#98FB98' },
    { type: 'cow', emoji: '🐮', description: '¡Plasta vaquera! Blandita pero sin ser diarrea', color: '#87CEEB' },
    { type: 'seagull', emoji: '🦅', description: '¡Explosión total! Corre que no llegas', color: '#FFD700' }
  ];

  const colors = [
    { 
      value: 'brown', 
      label: 'Marroncito', 
      bgColor: '#8B4513',
      textColor: '#FFFFFF',
      borderColor: '#654321',
      hoverBgColor: '#A0522D',
      selectedBgColor: '#8B4513'
    },
    { 
      value: 'darkBrown', 
      label: 'Chocolate', 
      bgColor: '#3E2723',
      textColor: '#FFFFFF',
      borderColor: '#2D1810',
      hoverBgColor: '#5D4037',
      selectedBgColor: '#3E2723'
    },
    { 
      value: 'lightBrown', 
      label: 'Cafecito', 
      bgColor: '#D2691E',
      textColor: '#FFFFFF',
      borderColor: '#A0522D',
      hoverBgColor: '#CD853F',
      selectedBgColor: '#D2691E'
    },
    { 
      value: 'yellow', 
      label: 'Mostaza', 
      bgColor: '#DAA520',
      textColor: '#FFFFFF',
      borderColor: '#B8860B',
      hoverBgColor: '#FFD700',
      selectedBgColor: '#DAA520'
    }
  ];

  const experiences = [
    { value: 'excellent', emoji: '😌', description: '¡Sin esfuerzo!', color: '#4CAF50' },
    { value: 'good', emoji: '😊', description: 'Todo bien', color: '#4CAF50' },
    { value: 'difficult', emoji: '😫', description: 'Costó trabajo', color: '#FFC107' },
    { value: 'very_difficult', emoji: '😖', description: '¡Qué sufrimiento!', color: '#FF5252' }
  ];

  const handleDateClick = (value: Value) => {
    if (value instanceof Date) {
      setSelectedDate(value);
      setShowOptions(true);
    }
  };

  const handleSave = () => {
    addEntry({
      date: selectedDate,
      type: selectedType,
      color: selectedColor,
      experience: selectedExperience,
      characteristics,
    });

    setShowOptions(false);
    setSelectedType('cow');
    setSelectedColor('brown');
    setSelectedExperience('good');
    setCharacteristics({
      blood: false,
      floating: false,
      mucus: false,
      gas: false,
    });

    setShowSaveNotification(true);
    setTimeout(() => setShowSaveNotification(false), 3000);
  };

  const getExperienceEmoji = (experience: string) => {
    const exp = experiences.find(e => e.value === experience);
    return exp ? exp.emoji : '';
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view !== 'month') return null;

    const dayEntries = entries.filter(
      (e) => e.date.toDateString() === date.toDateString()
    );
    
    if (dayEntries.length === 0) return null;

    return (
      <div className="calendar-tile-content">
        <div className={`entries-grid entries-count-${dayEntries.length}`}>
          {dayEntries.map((entry, index) => {
            const layoutStyle = getLayoutStyle(dayEntries.length, index);
            return (
              <div
                key={entry.id}
                className={`experience-frame experience-${entry.experience}`}
                style={layoutStyle}
              >
                <div className="experience-emoji">
                  {getExperienceEmoji(entry.experience)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const getLayoutStyle = (totalEntries: number, index: number) => {
    switch (totalEntries) {
      case 1:
        return {
          gridColumn: '1 / -1',
          gridRow: '1 / -1',
          fontSize: 'clamp(1.2em, 2vw, 1.5em)'
        };
      case 2:
        return {
          gridColumn: index === 0 ? '1' : '2',
          gridRow: '1 / -1',
          fontSize: 'clamp(0.9em, 1.5vw, 1.2em)'
        };
      case 3:
        if (index === 0) {
          return {
            gridColumn: '1 / -1',
            gridRow: '1',
            fontSize: 'clamp(0.8em, 1.2vw, 1em)'
          };
        }
        return {
          gridColumn: index === 1 ? '1' : '2',
          gridRow: '2',
          fontSize: 'clamp(0.8em, 1.2vw, 1em)'
        };
      case 4:
        return {
          gridColumn: index % 2 === 0 ? '1' : '2',
          gridRow: index < 2 ? '1' : '2',
          fontSize: 'clamp(0.7em, 1vw, 0.9em)'
        };
      default:
        return {};
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Typography className="app-title">
        ¡Mi Diario Especial!
        <span className="app-title-icon">🚽</span>
      </Typography>
      
      <Paper className="fun-paper mb-6">
        <Calendar
          onChange={handleDateClick}
          value={selectedDate}
          tileContent={tileContent}
          className="mx-auto"
          locale="es-ES"
          showNeighboringMonth={true}
          maxDetail="month"
          minDetail="month"
        />
      </Paper>

      {showOptions && (
        <Paper className="p-4 mb-6">
          <Typography 
            variant="h6" 
            className="section-title"
            sx={{
              color: '#FF8C00',
              fontSize: '1.5rem',
              fontWeight: 700,
              marginBottom: '1.5rem',
              textAlign: 'center',
              fontFamily: '"Fredoka One", cursive',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            ¿Cómo fue la experiencia?
          </Typography>

          <Grid container spacing={4} className="mb-8">
            {consistencyTypes.map((type) => (
              <Grid item xs={6} key={type.type}>
                <Button
                  className={`fun-button ${selectedType === type.type ? 'selected' : ''}`}
                  onClick={() => setSelectedType(type.type as 'rabbit' | 'goat' | 'cow' | 'seagull')}
                  fullWidth
                >
                  <div className="text-center">
                    <div style={{ fontSize: '2em' }}>{type.emoji}</div>
                    <div className="mt-2 text-sm">{type.description}</div>
                  </div>
                </Button>
              </Grid>
            ))}
          </Grid>

          <Typography 
            variant="h6" 
            className="section-title"
            sx={{
              color: '#FF8C00',
              fontSize: '1.5rem',
              fontWeight: 700,
              marginBottom: '1.5rem',
              textAlign: 'center',
              fontFamily: '"Fredoka One", cursive',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            ¿De qué color?
          </Typography>

          <Grid container spacing={4} className="mb-8">
            {colors.map((color) => (
              <Grid item xs={6} key={color.value}>
                <Button
                  className="color-button"
                  onClick={() => setSelectedColor(color.value)}
                  fullWidth
                  style={{
                    backgroundColor: selectedColor === color.value ? color.selectedBgColor : color.bgColor,
                    color: color.textColor,
                    borderColor: color.borderColor,
                  }}
                >
                  {color.label}
                </Button>
              </Grid>
            ))}
          </Grid>

          <Typography 
            variant="h6" 
            className="section-title"
            sx={{
              color: '#FF8C00',
              fontSize: '1.5rem',
              fontWeight: 700,
              marginBottom: '1.5rem',
              textAlign: 'center',
              fontFamily: '"Fredoka One", cursive',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            ¿Qué tal fue?
          </Typography>

          <Grid container spacing={4} className="mb-8">
            {experiences.map((exp) => (
              <Grid item xs={6} key={exp.value}>
                <Button
                  className={`fun-button ${selectedExperience === exp.value ? 'selected' : ''}`}
                  onClick={() => setSelectedExperience(exp.value as 'excellent' | 'good' | 'difficult' | 'very_difficult')}
                  fullWidth
                >
                  <div className="text-center">
                    <div style={{ fontSize: '2em' }}>{exp.emoji}</div>
                    <div className="mt-2 text-sm">{exp.description}</div>
                  </div>
                </Button>
              </Grid>
            ))}
          </Grid>

          <Typography 
            variant="h6" 
            className="section-title"
            sx={{
              color: '#FF8C00',
              fontSize: '1.5rem',
              fontWeight: 700,
              marginBottom: '1.5rem',
              textAlign: 'center',
              fontFamily: '"Fredoka One", cursive',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            Características especiales
          </Typography>

          <Grid container spacing={4} className="mb-8">
            <Grid item xs={6}>
              <div
                className={`characteristic-label ${characteristics.blood ? 'checked' : ''}`}
                onClick={() => setCharacteristics(prev => ({ ...prev, blood: !prev.blood }))}
              >
                <span className="characteristic-emoji">🩸</span>
                <span className="characteristic-text">Sangre</span>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div
                className={`characteristic-label ${characteristics.floating ? 'checked' : ''}`}
                onClick={() => setCharacteristics(prev => ({ ...prev, floating: !prev.floating }))}
              >
                <span className="characteristic-emoji">🎈</span>
                <span className="characteristic-text">Flotante</span>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div
                className={`characteristic-label ${characteristics.mucus ? 'checked' : ''}`}
                onClick={() => setCharacteristics(prev => ({ ...prev, mucus: !prev.mucus }))}
              >
                <span className="characteristic-emoji">💫</span>
                <span className="characteristic-text">Mucosidad</span>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div
                className={`characteristic-label ${characteristics.gas ? 'checked' : ''}`}
                onClick={() => setCharacteristics(prev => ({ ...prev, gas: !prev.gas }))}
              >
                <span className="characteristic-emoji">💨</span>
                <span className="characteristic-text">Gases</span>
              </div>
            </Grid>
          </Grid>

          <Box display="flex" justifyContent="space-between">
            <Button
              variant="outlined"
              onClick={() => setShowOptions(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
            >
              Guardar
            </Button>
          </Box>
        </Paper>
      )}

      <Fade in={showSaveNotification}>
        <div className="save-notification">
          ¡Guardado con éxito! 🎉
        </div>
      </Fade>
    </div>
  );
}