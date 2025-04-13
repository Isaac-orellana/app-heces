import React from 'react';
import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { CalendarMonth, Assessment } from '@mui/icons-material';
import CalendarView from './views/CalendarView';
import StatsView from './views/StatsView';

export default function Navigation() {
  const [value, setValue] = React.useState(0);

  return (
    <>
      <main className="pb-16">
        {value === 0 && <CalendarView />}
        {value === 1 && <StatsView />}
      </main>
      
      <Paper 
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} 
        elevation={3}
      >
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
        >
          <BottomNavigationAction 
            label="Calendario" 
            icon={<CalendarMonth />} 
          />
          <BottomNavigationAction 
            label="Estadísticas" 
            icon={<Assessment />} 
          />
        </BottomNavigation>
      </Paper>
    </>
  );
}