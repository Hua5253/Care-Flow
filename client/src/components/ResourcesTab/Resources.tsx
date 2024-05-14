import { useEffect, useState } from "react";
import { Box, Fab, Tab, Tabs, TabsOwnProps, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
import TableMedicalEquipment from "./TableMedicalEquipment";
import TableMedicine from "./TableMedicine";
import TableRoom from "./TableRoom";
import SearchBarMedicalEquipment from "./SearchBarMedicalEquipment";
import SearchBarMedicine from "./SearchBarMedicine";
import SearchBarRoom from "./SearchBarRoom";
import ModalMedicalEquipment from "./ModalMedicalEquipment";
import ModalMedicine from "./ModalMedicine";
import ModalRoom from "./ModalRoom";
import equipmentService from "../../services/equipment-service";
import medicineService from "../../services/medicine-service";
import roomService from "../../services/room-service";

// const tabs: string[] = ["Medical Equipment", "Medicine", "Officers", "Room"];
const tabs: string[] = ["Medical Equipment", "Medicine", "Room"];

export default function Resources() {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [open, setOpen] = useState<string>("");
  const [equipmentData, setEquipmentData] = useState<any>([]);
  const [equipmentDataAfterFilter, setEquipmentDataAfterFilter] = useState<any>(
    []
  );
  const [medicineData, setMedicineData] = useState<any>([]);
  const [medicineDataAfterFilter, setMedicineDataAfterFilter] = useState<any>(
    []
  );
  const [roomData, setRoomData] = useState<any>([]);
  const [roomDataAfterFilter, setRoomDataAfterFilter] = useState<any>([]);
  const [search, setSearch] = useState<string>("");

  async function fetchData() {
    try {
      switch (tabIndex) {
        case 0:
          await equipmentService.getAll().then((res) => {
            setEquipmentData(res.data);
          });
          break;
        case 1:
          await medicineService.getAll().then((res) => {
            setMedicineData(res.data);
          });
          break;
        // case 2:
        //   // const officersData = await officersService.getAll();
        //   // setData(officersData);
        //   break;
        case 2:
          await roomService.getAll().then((res) => {
            setRoomData(res.data);
          });
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [tabIndex]);

  const handleTabChange: TabsOwnProps["onChange"] = (_, index) => {
    setTabIndex(index);
  };

  const handleAdd = () => {
    setOpen(tabs[tabIndex]);
  };

  const handleSubmit = (data: any) => {
    switch (tabIndex) {
      case 0:
        equipmentService.create(data).then((res) => {
          setEquipmentData([...equipmentData, res.data]);
          setOpen("");
        });
        break;
      case 1:
        medicineService.create(data).then((res) => {
          setMedicineData([...medicineData, res.data]);
          setOpen("");
        });
        break;
      // case 2:
      //   // const officersData = await officersService.getAll();
      //   // setData(officersData);
      //   break;
      case 2:
        roomService.create(data).then((res) => {
          setRoomData([...roomData, res.data]);
          setOpen("");
        });
        break;
      default:
        break;
    }
  };

  const handleEdit = () => {
    fetchData();
    setOpen("");
  };

  const handleDelete = () => {
    fetchData();
    setOpen("");
  };

  useEffect(() => {
    setEquipmentDataAfterFilter(equipmentData);
    if (search) {
      handleSearch("Medical Equipment", search);
    }
  }, [equipmentData]);

  useEffect(() => {
    setMedicineDataAfterFilter(medicineData);
    if (search) {
      handleSearch("Medicine", search);
    }
  }, [medicineData]);

  useEffect(() => {
    setRoomDataAfterFilter(roomData);
    if (search) {
      handleSearch("Room", search);
    }
  }, [roomData]);

  const handleSearch = (from: string, data: string) => {
    setSearch(data);
    console.log("Search from", from, "for: ", data);
    let result = {};

    switch (from) {
      case "Medical Equipment":
        if (data) {
          result = equipmentData.filter((item: any) => {
            return (
              item.name.toLowerCase().includes(data.toLowerCase()) ||
              item.category.toLowerCase().includes(data.toLowerCase()) ||
              item.status.toLowerCase().includes(data.toLowerCase()) ||
              item.quantity.toString().includes(data.toLowerCase()) ||
              item._id.toString().includes(data.toLowerCase())
            );
          });
          setEquipmentDataAfterFilter(result);
        } else {
          setEquipmentDataAfterFilter(equipmentData);
        }
        break;
      case "Medicine":
        if (data) {
          result = medicineData.filter((item: any) => {
            return (
              item.name.toLowerCase().includes(data.toLowerCase()) ||
              item.category.toLowerCase().includes(data.toLowerCase()) ||
              item.usage.toLowerCase().includes(data.toLowerCase()) ||
              item.packaging.toLowerCase().includes(data.toLowerCase()) ||
              item.quantity.toString().includes(data.toLowerCase())
            );
          });
          setMedicineDataAfterFilter(result);
        } else {
          setMedicineDataAfterFilter(medicineData);
        }
        break;
      case "Room":
        if (data) {
          result = roomData.filter((item: any) => {
            return (
              item.name.toLowerCase().includes(data.toLowerCase()) ||
              item.status.toLowerCase().includes(data.toLowerCase()) ||
              item.capacity.toString().includes(data.toLowerCase()) ||
              item.location.toLowerCase().includes(data.toLowerCase()) ||
              item._id.toString().includes(data.toLowerCase())
            );
          });
          setRoomDataAfterFilter(result);
        } else {
          setRoomDataAfterFilter(roomData);
        }
        break;
    }
  };

  const modals: React.ReactElement[] = [
    <ModalMedicalEquipment
      open={open === "Medical Equipment"}
      onClose={() => setOpen("")}
      onOk={(data) => handleSubmit(data)}
      title="Create New Equipment"
    />,
    <ModalMedicine
      open={open === "Medicine"}
      onClose={() => setOpen("")}
      onOk={(data) => {
        handleSubmit(data);
      }}
      title="Create New Medicine"
    />,
    // <ModalOffice
    //   open={open === "Officers"}
    //   onClose={() => setOpen("")}
    //   onOk={() => {}}
    //   title="Create New Officer"
    // />,
    <ModalRoom
      open={open === "Room"}
      onClose={() => {
        setOpen("");
      }}
      onOk={(data) => {
        handleSubmit(data);
      }}
      title="Create New Room"
    />,
  ];

  const tables: React.ReactElement[] = [
    <TableMedicalEquipment
      dataSource={equipmentDataAfterFilter}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />,
    <TableMedicine
      dataSource={medicineDataAfterFilter}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />,
    // <TableOfficers />,
    <TableRoom
      dataSource={roomDataAfterFilter}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />,
  ];

  const searchbars: React.ReactElement[] = [
    <SearchBarMedicalEquipment
      onSearch={(data) => handleSearch("Medical Equipment", data)}
    />,
    <SearchBarMedicine onSearch={(data) => handleSearch("Medicine", data)} />,
    // <SearchBarOfficers />,
    <SearchBarRoom onSearch={(data) => handleSearch("Room", data)} />,
  ];

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: "100%",
        height: "fit-content",
        minWidth: 0,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" pb={1} gutterBottom>
        Resource
      </Typography>
      <Box
        sx={{
          border: "lightgrey solid",
          mt: 3,
          p: 1,
          backgroundColor: "#e5e5e5",
          borderRadius: 1,
          width: "100%",
          height: "100%",
        }}
      >
        <Tabs
          sx={{ width: "100%" }}
          value={tabIndex}
          onChange={handleTabChange}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={tab}
              label={tab}
              value={index}
              sx={{ color: "dark grey" }}
            />
          ))}
        </Tabs>
        {modals[tabIndex]}
        {/* {searchbars[tabIndex]} */}
        <Box display="flex" sx={{ mb: 3, mt: 3 }}>
          <Grid
            container
            spacing={2}
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Grid item style={{ flexGrow: 1 }}>
              {/* <SearchBar /> */}
              {searchbars[tabIndex]}
            </Grid>
            <Grid item>
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
        {tables[tabIndex]}
      </Box>
    </Box>
  );
}
