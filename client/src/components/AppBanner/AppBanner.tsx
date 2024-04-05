import { Box } from "@mui/material";
import NavBar from "./NavBar";

interface Prop {
  cred: Boolean;
}

export default function AppBanner({ cred }: Prop) {
  return (
    <Box sx={{ display: "flex", overflow: "auto" }}>
      <NavBar cred={cred} />
    </Box>
  );
}
