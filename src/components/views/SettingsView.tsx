import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  Paper,
  Typography,
  Button,
} from '@mui/material';
import {
  Lock,
  Notifications,
  Download,
} from '@mui/icons-material';
import { useStore } from '../../store';

export default function SettingsView() {
  const { isPrivateMode, togglePrivateMode, entries } = useStore();

  const exportData = () => {
    const dataStr = JSON.stringify(entries, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', 'bowel-tracker-data.json');
    linkElement.click();
  };

  return (
    <div className="p-4">
      <Typography variant="h1" className="mb-6 text-center">
        Settings
      </Typography>

      <Paper>
        <List>
          <ListItem>
            <ListItemIcon>
              <Lock />
            </ListItemIcon>
            <ListItemText primary="Private Mode" />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                checked={isPrivateMode}
                onChange={togglePrivateMode}
              />
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <Notifications />
            </ListItemIcon>
            <ListItemText
              primary="Reminders"
              secondary="Set daily reminders"
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <Download />
            </ListItemIcon>
            <ListItemText primary="Export Data" />
            <ListItemSecondaryAction>
              <Button onClick={exportData}>
                Export
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Paper>
    </div>
  );
}