import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalMedicalEquipment from "./ModalMedicalEquipment";
import { useEffect, useState } from "react";
import { Equipment } from "../../services/equipment-service";
import equipmentService from "../../services/equipment-service";
// interface MedicalEquipment {
//   name: string;
//   id: string;
//   category: string;
//   quantity: string;
//   status: string;
// }

// const dataSource: MedicalEquipment[] = [
//   {
//     name: "Surgical Masks",
//     id: "LAB-0238",
//     category: "Surgical Masks",
//     quantity: "1200 units",
//     status: "In Stock",
//   },
//   {
//     name: "Surgical Masks",
//     id: "LAB-0237",
//     category: "Stethoscope",
//     quantity: "35 units ",
//     status: "Low Stock",
//   },
//   {
//     name: "Surgical Masks",
//     id: "LAB-0236",
//     category: "IV Drip Bags",
//     quantity: "500 units",
//     status: "Out of Stock",
//   },
//   {
//     name: "Surgical Masks",
//     id: "LAB-0235",
//     category: "Hand Sanitizer",
//     quantity: "150 units",
//     status: "On Order",
//   },
// ];
interface Prop {
  dataSource: Equipment[];
  onEdit: () => void;
}
export default function TableMedicalEquipment({ dataSource, onEdit }: Prop) {
  const [openId, setOpenId] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedEqDetail, setSelectedEqDetail] = useState<Equipment>(
    {} as Equipment
  );
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      "In Stock": "#409832",
      "Low Stock": "#B1840F",
      "Out of Stock": "#B1190F",
      "On Order": "#2686AF",
    };
    return colors[status] || "#000";
  };

  useEffect(() => {
    if (openId) {
      equipmentService.getById(openId).then((res) => {
        setSelectedEqDetail(res.data as Equipment);
        setShowModal(true);
      });
    }
  }, [openId]);

  //updates the data
  const onSubmit = (data: any) => {
    // console.log(data);
    equipmentService
      .updateById(openId, data)
      .then((res) => {
        console.log("successfully updated ", res.data);
        setShowModal(false);
        setOpenId("");
        onEdit();
      })
      .catch((err): void => {
        console.log(err);
      });
  };
  return (
    <TableContainer
      component={Paper}
      sx={{ width: "100%", border: "solid 0.1em grey", shadow: "inherit" }}
    >
      <ModalMedicalEquipment
        open={showModal}
        onClose={() => {
          setOpenId("");
          setShowModal(false);
        }}
        onOk={onSubmit}
        title="Edit Medical Equipment"
        item={selectedEqDetail}
      />
      <Table aria-label="simple table" stickyHeader sx={{ width: "100%" }}>
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ fontWeight: 700 }}>
              <TableSortLabel active={true}>Item Name</TableSortLabel>
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 700 }}>
              <TableSortLabel active={true}>Item ID</TableSortLabel>
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 700 }}>
              <TableSortLabel active={true}>Category</TableSortLabel>
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 700 }}>
              <TableSortLabel active={true}>Quantity Available</TableSortLabel>
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 700 }}>
              <TableSortLabel active={true}>Status</TableSortLabel>
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 700 }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataSource.map((data, index) => (
            <TableRow
              key={index}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
            >
              <TableCell align="left" component="th" scope="row">
                {data.name}
              </TableCell>
              <TableCell align="left">{data._id}</TableCell>
              <TableCell align="left">{data.category}</TableCell>
              <TableCell align="left">{data.quantity}</TableCell>
              <TableCell
                align="left"
                style={{ color: getStatusColor(data.status) }}
              >
                {data.status}
              </TableCell>
              <TableCell align="left" size="medium">
                <Button
                  variant="outlined"
                  sx={{ fontSize: "13px" }}
                  onClick={() => setOpenId(data._id || "")}
                >
                  Edit
                </Button>
                <IconButton size="medium" sx={{ ml: 3 }}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
