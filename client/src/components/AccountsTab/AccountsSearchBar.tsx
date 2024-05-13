import { Box, Button, Divider, InputBase, Paper } from "@mui/material";
import React, { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
  onSearch: (searchInput: string) => void;
}

export default function AccountsSearchBar({ onSearch }: Props) {
  const [searchInput, setSearchInput] = React.useState<string>("");
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchInput);
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
          sx={{ ml: 1, flex: 1, fontSize: "15px" }}
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
        >
          Search
        </Button>
      </Paper>
    </Box>
  );
}
