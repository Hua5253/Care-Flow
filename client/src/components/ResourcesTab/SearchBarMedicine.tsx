import {
  Box,
  Button,
  Divider,
  InputBase,
  Paper,
} from "@mui/material";
import React, { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
interface Props {
  onSearch: (searchInput: string) => void;
}

export default function SearchBarMedicine({ onSearch }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [searchInput, setSearchInput] = React.useState<string>("");
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchInput);
    console.log(anchorEl);
  };

  useEffect(() => {
    onSearch(searchInput);
  }, [searchInput]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "left",
        border: "1px solid",
        borderRadius: 1,
        marginTop: "1em",
        marginBottom: "1em",
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
          // endIcon={<ExpandMoreTwoToneIcon />}
          onClick={handleClick}
        >
          Search
        </Button>
        {/* <Menu
          anchorEl={anchorEl}
          id="search_medicalEquipment_by"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
        >
          <MenuItem>Name</MenuItem>
          <MenuItem>Category</MenuItem>
          <MenuItem>Usage</MenuItem>
          <MenuItem>Packaging</MenuItem>
          <MenuItem>All</MenuItem>
        </Menu> */}
      </Paper>
    </Box>
  );
}
