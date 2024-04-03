import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function PathwayScreen() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Item>APP BAR</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>Sidebar</Item>
        </Grid>
        <Grid item xs={8}>
          <Item>Main Contents</Item>
        </Grid>
      </Grid>
    </Box>
  );
}
