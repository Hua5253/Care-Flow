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

export default function SearchBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [searchInput, setSearchInput] = React.useState<string>("");
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(searchInput);
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
        onSubmit={handleSearch}
      >
        <Box sx={{ p: 1 }}>
          <SearchIcon />
        </Box>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          inputProps={{ "aria-label": "Search" }}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
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
          Search
        </Button>
        {/* <Menu
          anchorEl={anchorEl}
          id="search_resources_by"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
        >
          <MenuItem>Medical equipment</MenuItem>
          <MenuItem>Room</MenuItem>
          <MenuItem>Officers</MenuItem>
          <MenuItem>Medicine</MenuItem>
          <MenuItem>All</MenuItem>
        </Menu> */}
      </Paper>
    </Box>
  );
}
