import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { SxProps, Theme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

export default function Splash() {
  // Should we put these stylings into css files separately?
  const boxStyle: SxProps<Theme> = {
    backgroundColor: "hsla(200,100%,50%,0.2);", // Replace with the actual color from the splash screen
    color: "black",
    padding: "2em",
    border: "2px solid #A8A8A8",
    borderRadius: 2,
    boxShadow: 5,
    textAlign: "center",
    width: "fit-content",
  };

  const buttonStyle: SxProps<Theme> = {
    backgroundColor: "#1976d2",
    ":hover": {
      backgroundColor: "#0d47a1", // Darker shade for hover state
    },
    color: "white",
    margin: "1em",
    border: "1px solid #A8A8A8",
  };
  const iconStyle: SxProps<Theme> = {
    height: 233,
    width: 350,
    maxHeight: { xs: 233, md: 167 },
    maxWidth: { xs: 350, md: 250 },
    textAlign: "center",
  };
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };

  return (
    <Box sx={boxStyle} id="splash-modal">
      <Container>
        <Typography variant="h3" gutterBottom component="h1">
          Welcome To CareFlow!
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 4 }}>
          A platform to provide quality care as quickly and efficiently as
          possible
        </Typography>
        <Box
          component="img"
          sx={iconStyle}
          alt="Hospital illustration"
          src="https://i.imgur.com/KoIVCtj.png"
        />
        <div>
          <Button sx={buttonStyle} onClick={handleClick}>
            Login
          </Button>
        </div>
      </Container>
    </Box>
  );
}
