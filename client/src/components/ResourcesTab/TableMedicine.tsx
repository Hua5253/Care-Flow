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
import { useEffect, useState } from "react";
import ModalMedicine from "./ModalMedicine";
import medicineService, { Medicine } from "../../services/medicine-service";

// interface Medicine {
//   id: string;
//   name: string;
//   category: string;
//   usage: string;
//   packaging: string;
//   stockQuantity: string;
// }

// const dataSource: Medicine[] = [
//   {
//     id: "1",
//     name: "Aspirin",
//     category: "NSAID",
//     usage: "reduce pain",
//     packaging: "100mg/tablet, 100 tablets/bottle",
//     stockQuantity: "500 bottles",
//   },
//   {
//     id: "2",
//     name: "Amoxicillin",
//     category: "Antibiotic",
//     usage: "treat various",
//     packaging: "500mg/capsule, 30 capsules/box",
//     stockQuantity: "300 boxes",
//   },
//   {
//     id: "3",
//     name: "Metoprolol",
//     category: "Beta-Blocker",
//     usage: "treat high blood",
//     packaging: "50mg/tablet, 60 tablets/bottle.",
//     stockQuantity: "200 bottles",
//   },
//   {
//     id: "4",
//     name: "Rivaroxaban",
//     category: "Anticoagulant",
//     usage: "Used to treat high",
//     packaging: "20mg/tablet, 30 tablets/box",
//     stockQuantity: "150 boxes",
//   },
// ];

interface Prop {
  dataSource: Medicine[];
  onEdit: () => void;
}

export default function TableMedicine({ dataSource, onEdit }: Prop) {
  const [openId, setOpenId] = useState<string>("");
  const [selectedMedicineDetail, setSelectedMedicineDetail] =
    useState<Medicine>({} as Medicine);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    if (openId) {
      medicineService.getById(openId).then((res) => {
        setSelectedMedicineDetail(res.data as Medicine);
        setShowModal(true);
      });
    }
  }, [openId]);

  //updates the data
  const onSubmit = (data: any) => {
    console.log(data);
    medicineService
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
      <ModalMedicine
        open={showModal}
        onClose={() => {
          setOpenId("");
          setShowModal(false);
        }}
        onOk={onSubmit}
        title="Edit Medicine"
        item={selectedMedicineDetail}
      />
      <Table aria-label="simple table" stickyHeader sx={{ width: "100%" }}>
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ fontWeight: 700 }}>
              <TableSortLabel active={true}>Medicine Name</TableSortLabel>
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 700 }}>
              <TableSortLabel active={true}>Category</TableSortLabel>
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 700 }}>
              <TableSortLabel active={true}>Usage</TableSortLabel>
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 700 }}>
              <TableSortLabel active={true}>Packaging</TableSortLabel>
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 700 }}>
              <TableSortLabel active={true}>Stock Quantity</TableSortLabel>
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
              <TableCell align="left">{data.category}</TableCell>
              <TableCell align="left">{data.usage}</TableCell>
              <TableCell align="left">{data.packaging}</TableCell>
              <TableCell align="left">{data.quantity}</TableCell>
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
