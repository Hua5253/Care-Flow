import { Box, IconButton } from "@mui/material";
import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
export default function Notifications() {
  return (
    <Box sx={{ paddingLeft: "1em" }}>
      <IconButton color="inherit">
        <NotificationsIcon />
      </IconButton>
    </Box>
  );
}
