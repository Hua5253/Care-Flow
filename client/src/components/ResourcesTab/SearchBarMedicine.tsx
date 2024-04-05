import {
  Box,
  Button,
  Divider,
  InputBase,
  Menu,
  MenuItem,
  Paper,
} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";

export default function SearchBarMedicine() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "left",
        border: "1px solid",
        borderRadius: 1,
      }}
    >
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box sx={{ p: 1 }}>
          <SearchIcon />
        </Box>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          inputProps={{ "aria-label": "Search" }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <Button
          color="primary"
          sx={{
            p: "10px",
            "&:hover": {
              backgroundColor: "#e0e0e0",
            },
          }}
          aria-label="Search_by"
          endIcon={<ExpandMoreTwoToneIcon />}
          onClick={handleClick}
        >
          Search By
        </Button>
        <Menu
          anchorEl={anchorEl}
          id="search_medicalEquipment_by"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
        >
          <MenuItem>Name</MenuItem>
          <MenuItem>Category</MenuItem>
          <MenuItem>Usage</MenuItem>
          <MenuItem>Stock</MenuItem>
        </Menu>
      </Paper>
    </Box>
  );
}