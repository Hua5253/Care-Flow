import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function NavBar() {
    const login = false;
    return (
        <AppBar sx={{ flexGrow: 1 }} id="navbar">
            <Toolbar>
                <Typography
                    variant="h5"
                    noWrap
                    sx={{ flexGrow: 1, textAlign: "left" }}
                >
                    CareFlow
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    );
}
