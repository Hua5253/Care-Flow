import { Box } from "@mui/material";
import React from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

export default function AppBanner() {
  return (
    <Box sx={{ display: "flex", overflow: "auto" }}>
      <NavBar />
      <SideBar />
    </Box>
  );
}
