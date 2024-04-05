import { useState } from 'react';
import { Box, IconButton, Popover, List, ListItem, ListItemText, ListItemIcon, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ChatIcon from '@mui/icons-material/Chat';

export default function Notifications() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box sx={{ paddingLeft: '1em' }}>
      <IconButton color="inherit" onClick={handleClick}>
        <NotificationsIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
          '& .MuiPopover-paper': {
            width: '20em',
            backgroundColor: '#5C6B73', // Outer popover background
          },
        }}
      >
        <Typography sx={{ p: 2, color: 'white' }}>Notifications</Typography>
        <List sx={{ pt: 0 }}>
          <ListItem 
            button 
            sx={{ 
              backgroundColor: '#9DB4C0', 
              mb: 1, 
              borderRadius: '10px', // rounded corners
              '&:last-child': { mb: 0 }, // remove bottom margin for the last item
            }}
          >
            <ListItemIcon>
              <EventNoteIcon color="action" />
            </ListItemIcon>
            <ListItemText primary="Upcoming procedure" secondary="Aug 24 12:30pm, Alice Johnson, MRI" />
          </ListItem>
          <ListItem 
            button 
            sx={{ 
              backgroundColor: '#9DB4C0', 
              mb: 1, // margin bottom for spacing
              borderRadius: '10px', // rounded corners
            }}
          >
            <ListItemIcon>
              <ChatIcon color="action" />
            </ListItemIcon>
            <ListItemText primary="John Doe" secondary="Yes of course. Are there problems..." />
          </ListItem>
        </List>
      </Popover>
    </Box>
  );
}
