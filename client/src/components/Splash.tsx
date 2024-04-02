import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { SxProps, Theme } from "@mui/material/styles";

export default function Splash() {
    // Define styles using MUI's SxProps type for TypeScript support
    const boxStyle: SxProps<Theme> = {
        backgroundColor: "#2a3eb1", // Replace with the actual color from the splash screen
        color: "white",
        padding: "2em",
        border: "2px solid ",
        borderRadius: 2,
        boxShadow: 4,
        textAlign: "center",
        width: "fit-content",
    };

    const buttonStyle: SxProps<Theme> = {
        backgroundColor: "#4caf50",
        ":hover": {
            backgroundColor: "#388e3c", // Darker shade for hover state
        },
        color: "white",
        margin: "1em",
    };
    const iconStyle: SxProps<Theme> = {
        height: 233,
        width: 350,
        maxHeight: { xs: 233, md: 167 },
        maxWidth: { xs: 350, md: 250 },
        textAlign: "center",
    };

    return (
        <Box sx={boxStyle} id="splash-modal">
            <Container>
                <Typography variant="h3" gutterBottom component="h1">
                    Welcome To CareFlow!
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 4 }}>
                    A platform to provide quality care as quickly and
                    efficiently as possible
                </Typography>
                <Box
                    component="img"
                    sx={iconStyle}
                    alt="Hospital illustration"
                    src="../assets/hospital.jpeg"
                />
                <div>
                    <Button sx={buttonStyle}>Login</Button>
                </div>
            </Container>
        </Box>
    );
}
