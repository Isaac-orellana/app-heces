import React from 'react';
import { Paper, Typography, Grid, Box, Alert } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from 'recharts';
import { useStore } from '../../store';
import { format, subDays, isWithinInterval, startOfDay, endOfDay } from 'date-fns';
import { es } from 'date-fns/locale';

export default function StatsView() {
  const entries = useStore((state) => state.entries);

  // Calcular estadísticas de características
  const characteristicsStats = entries.reduce((acc, entry) => {
    if (entry.characteristics.blood) acc.blood = (acc.blood || 0) + 1;
    if (entry.characteristics.floating) acc.floating = (acc.floating || 0) + 1;
    if (entry.characteristics.mucus) acc.mucus = (acc.mucus || 0) + 1;
    if (entry.characteristics.gas) acc.gas = (acc.gas || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const characteristicsData = [
    { name: 'Sangre 🩸', value: characteristicsStats.blood || 0, color: '#FF5252' },
    { name: 'Flotantes 🎈', value: characteristicsStats.floating || 0, color: '#2196F3' },
    { name: 'Mucosidad 💫', value: characteristicsStats.mucus || 0, color: '#FFC107' },
    { name: 'Gases 💨', value: characteristicsStats.gas || 0, color: '#4CAF50' },
  ];

  // Calcular estadísticas de consistencia
  const consistencyStats = entries.reduce((acc, entry) => {
    acc[entry.type] = (acc[entry.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const consistencyData = [
    { name: 'Durillas 🐰', value: consistencyStats.rabbit || 0, color: '#FFB6C1', concern: 'Posible estreñimiento' },
    { name: 'Agrupadas 🐐', value: consistencyStats.goat || 0, color: '#98FB98', concern: 'Normal' },
    { name: 'Suaves 🐮', value: consistencyStats.cow || 0, color: '#87CEEB', concern: 'Normal' },
    { name: 'Líquidas 🦅', value: consistencyStats.seagull || 0, color: '#FFD700', concern: 'Posible diarrea' },
  ];

  // Calcular estadísticas de experiencia
  const experienceStats = entries.reduce((acc, entry) => {
    acc[entry.experience] = (acc[entry.experience] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const experienceData = [
    { name: 'Sin esfuerzo 😌', value: experienceStats.excellent || 0, color: '#4CAF50' },
    { name: 'Todo bien 😊', value: experienceStats.good || 0, color: '#8BC34A' },
    { name: 'Costó trabajo 😫', value: experienceStats.difficult || 0, color: '#FFC107' },
    { name: 'Sufrimiento 😖', value: experienceStats.very_difficult || 0, color: '#FF5252' },
  ];

  // Calcular tendencias de los últimos 7 días
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), i);
    const dayEntries = entries.filter(entry => 
      format(entry.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
    return {
      date: format(date, 'EEE', { locale: es }),
      count: dayEntries.length,
      difficult: dayEntries.filter(e => e.experience === 'difficult' || e.experience === 'very_difficult').length,
    };
  }).reverse();

  // Calcular alertas médicas usando ventana móvil de 7 días
  const medicalConcerns = [];
  
  // Definir ventana móvil de 7 días
  const sevenDaysAgo = startOfDay(subDays(new Date(), 7));
  const now = endOfDay(new Date());
  const rollingWindow = { start: sevenDaysAgo, end: now };

  // Obtener entradas de los últimos 7 días
  const last7DaysEntries = entries.filter(entry => 
    isWithinInterval(entry.date, rollingWindow)
  );

  // Verificar sangre en las heces en los últimos 7 días
  const bloodEntriesCount = last7DaysEntries.filter(entry => 
    entry.characteristics.blood
  ).length;

  if (bloodEntriesCount >= 2) {
    medicalConcerns.push({
      text: '⚠️ Se ha detectado sangre en las heces en múltiples ocasiones durante los últimos 7 días.',
      severity: 'high',
    });
  }

  // Verificar patrones de estreñimiento en los últimos 7 días
  const hardStoolsCount = last7DaysEntries.filter(entry => 
    entry.type === 'rabbit'
  ).length;

  if (hardStoolsCount >= 3) {
    medicalConcerns.push({
      text: '⚠️ Patrón frecuente de heces duras en los últimos 7 días que podría indicar estreñimiento.',
      severity: 'medium',
    });
  }

  // Verificar diarrea en los últimos 7 días
  const diarrheaCount = last7DaysEntries.filter(entry => 
    entry.type === 'seagull'
  ).length;

  if (diarrheaCount >= 3) {
    medicalConcerns.push({
      text: '⚠️ Episodios frecuentes de diarrea en los últimos 7 días.',
      severity: 'medium',
    });
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <Typography variant="h1" className="mb-6 text-center">
        Estadísticas de Salud
      </Typography>

      <Alert severity="info" className="mb-6">
        Esta aplicación es solo una herramienta de seguimiento y no sustituye el consejo médico profesional. 
        Las recomendaciones son orientativas y siempre debes consultar con un profesional de la salud para 
        cualquier preocupación médica.
      </Alert>

      {medicalConcerns.length > 0 && (
        <Paper className="p-4 mb-6 bg-red-50">
          <Typography variant="h6" className="mb-3 text-red-700">
            ⚕️ Patrones Detectados
          </Typography>
          {medicalConcerns.map((concern, index) => (
            <Typography 
              key={index} 
              className={`mb-2 ${
                concern.severity === 'high' ? 'text-red-600' : 'text-orange-600'
              }`}
            >
              {concern.text}
            </Typography>
          ))}
        </Paper>
      )}

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper className="p-4">
            <Typography variant="h6" gutterBottom>
              Consistencia 💩
            </Typography>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={consistencyData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {consistencyData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <Box className="mt-4">
              {consistencyData.map((item, index) => (
                <Typography key={index} variant="body2" className="mb-1">
                  {item.value > 0 && `${item.name}: ${item.concern}`}
                </Typography>
              ))}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className="p-4">
            <Typography variant="h6" gutterBottom>
              Características Especiales 🔍
            </Typography>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={characteristicsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value">
                    {characteristicsData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className="p-4">
            <Typography variant="h6" gutterBottom>
              Experiencia 😊
            </Typography>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={experienceData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {experienceData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className="p-4">
            <Typography variant="h6" gutterBottom>
              Últimos 7 días 📅
            </Typography>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={last7Days}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="count"
                    name="Total"
                    stroke="#FF8C00"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="difficult"
                    name="Difíciles"
                    stroke="#FF5252"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}