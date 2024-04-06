import { Box, Paper, Typography } from "@mui/material";

interface Message {
  message: String;
  date: String;
  self: Boolean;
}

export default function Message({ message, date, self }: Message) {
  return (
    <Paper
      sx={{
        p: 1.5,
        maxWidth: "70%",
        bgcolor: self ? "background.paper" : "primary.light",
        alignSelf: self ? "end" : "start",
        boxShadow: 3,
      }}
      variant="outlined"
    >
      <Box sx={{ pb: 2 }}>
        <Typography variant="body2">{message}</Typography>
      </Box>
      <Box>
        <Typography
          variant="caption"
          display="block"
          sx={{ textAlign: "right", pt: 1, fontSize: 10, color: "black" }}
        >
          {date}
        </Typography>
      </Box>
    </Paper>
  );
}
