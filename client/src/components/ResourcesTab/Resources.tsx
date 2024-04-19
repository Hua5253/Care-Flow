import { useState } from "react";
import { Box, Fab, Tab, Tabs, TabsOwnProps, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
import TableMedicalEquipment from "./TableMedicalEquipment";
import SearchBar from "./SearchBar";
import TableMedicine from "./TableMedicine";
import TableOfficers from "./TableOfficers";
import TableRoom from "./TableRoom";
import SearchBarMedicalEquipment from "./SearchBarMedicalEquipment";
import SearchBarMedicine from "./SearchBarMedicine";
import SearchBarOfficers from "./SearchBarOfficers";
import SearchBarRoom from "./SearchBarRoom";
import ModalMedicalEquipment from "./ModalMedicalEquipment";
import ModalMedicine from "./ModalMedicine";
import ModalRoom from "./ModalRoom";
import ModalOffice from "./ModalOffice";

const tabs: string[] = ["Medical Equipment", "Medicine", "Officers", "Room"];
const tables: React.ReactElement[] = [
  <TableMedicalEquipment />,
  <TableMedicine />,
  <TableOfficers />,
  <TableRoom />,
];
const searchbars: React.ReactElement[] = [
  <SearchBarMedicalEquipment />,
  <SearchBarMedicine />,
  <SearchBarOfficers />,
  <SearchBarRoom />,
];

export default function Resources() {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [open, setOpen] = useState<string>("");

  const handleTabChange: TabsOwnProps["onChange"] = (_, index) => {
    setTabIndex(index);
  };

  const handleAdd = () => {
    setOpen(tabs[tabIndex]);
  };

  const modals: React.ReactElement[] = [
    <ModalMedicalEquipment
      open={open === "Medical Equipment"}
      onClose={() => setOpen("")}
      onOk={() => {}}
      title='Create New Equipment'
    />,
    <ModalMedicine
      open={open === "Medicine"}
      onClose={() => setOpen("")}
      onOk={() => {}}
      title='Create New Medicine'
    />,
    <ModalOffice
      open={open === "Officers"}
      onClose={() => setOpen("")}
      onOk={() => {}}
      title='Create New Officer'
    />,
    <ModalRoom
      open={open === "Room"}
      onClose={() => setOpen("")}
      onOk={() => {}}
      title='Create New Room'
    />,
  ];

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 3,
        marginLeft: "6em",
        marginTop: 8,
        width: "100%",
        minWidth: 0,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Resource
      </Typography>
      <Box display="flex" sx={{ mb: 3, mt: 3 }}>
        <Grid
          container
          spacing={2}
          sx={{ alignItems: "center", justifyContent: "center" }}
        >
          <Grid item xs={10}>
            <SearchBar />
          </Grid>
          <Grid item xs={2}>
            <Fab
              variant="extended"
              size="small"
              color="primary"
              sx={{
                fontSize: "12px",
                alignItems: "center",
                borderRadius: 1,
                height: "45px",
              }}
              onClick={handleAdd}
            >
              <AddIcon fontSize="small" />
              Create Item
            </Fab>
          </Grid>
        </Grid>
      </Box>
      <Tabs sx={{ width: "100%" }} value={tabIndex} onChange={handleTabChange}>
        {tabs.map((tab, index) => (
          <Tab key={tab} label={tab} value={index} />
        ))}
      </Tabs>
      {modals[tabIndex]}
      {searchbars[tabIndex]}
      {tables[tabIndex]}
    </Box>
  );
}
