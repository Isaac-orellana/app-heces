import React from 'react';
import { Button, Paper, Typography, Box } from '@mui/material';
import { Add } from '@mui/icons-material';
import NewEntryDialog from '../NewEntryDialog';
import { useStore } from '../../store';

export default function HomeView() {
  const [open, setOpen] = React.useState(false);
  const entries = useStore((state) => state.entries);
  const recentEntries = [...entries]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 5);

  const getEmoji = (type: string) => {
    switch (type) {
      case 'rabbit': return '🐰';
      case 'goat': return '🐐';
      case 'cow': return '🐮';
      case 'deer': return '🦌';
      default: return '❓';
    }
  };

  const getExperienceEmoji = (experience: string) => {
    switch (experience) {
      case 'good': return '😊';
      case 'neutral': return '😐';
      case 'bad': return '😣';
      default: return '❓';
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <Typography variant="h1" className="mb-6 text-center">
        Daily Tracker
      </Typography>

      <Button
        variant="contained"
        size="large"
        startIcon={<Add />}
        fullWidth
        onClick={() => setOpen(true)}
        className="mb-6"
      >
        New Entry
      </Button>

      <Typography variant="h6" className="mb-4">
        Recent Entries
      </Typography>

      {recentEntries.map((entry) => (
        <Paper key={entry.id} className="p-4 mb-4">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography>
              {getEmoji(entry.type)} {getExperienceEmoji(entry.experience)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {entry.date.toLocaleDateString()}
            </Typography>
          </Box>
        </Paper>
      ))}

      <NewEntryDialog open={open} onClose={() => setOpen(false)} />
    </div>
  );
}