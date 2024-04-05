import { Box } from "@mui/material";
import React from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

interface Prop {
  cred: Boolean;
  section: String;
}

export default function AppBanner({ cred, section }: Prop) {
  return (
    <Box sx={{ display: "flex", overflow: "auto" }}>
      <NavBar cred={cred} />
      <SideBar section={section} />
    </Box>
  );
}
