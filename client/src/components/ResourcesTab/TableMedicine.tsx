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
import { useState } from "react";
import ModalMedicine from "./ModalMedicine";

interface Medicine {
  id: string;
  name: string;
  category: string;
  usage: string;
  packaging: string;
  stockQuantity: string;
}

const dataSource: Medicine[] = [
  {
    id: "1",
    name: "Aspirin",
    category: "NSAID",
    usage: "reduce pain",
    packaging: "100mg/tablet, 100 tablets/bottle",
    stockQuantity: "500 bottles",
  },
  {
    id: "2",
    name: "Amoxicillin",
    category: "Antibiotic",
    usage: "treat various",
    packaging: "500mg/capsule, 30 capsules/box",
    stockQuantity: "300 boxes",
  },
  {
    id: "3",
    name: "Metoprolol",
    category: "Beta-Blocker",
    usage: "treat high blood",
    packaging: "50mg/tablet, 60 tablets/bottle.",
    stockQuantity: "200 bottles",
  },
  {
    id: "4",
    name: "Rivaroxaban",
    category: "Anticoagulant",
    usage: "Used to treat high",
    packaging: "20mg/tablet, 30 tablets/box",
    stockQuantity: "150 boxes",
  },
];

export default function TableMedicine() {
  const [openId, setOpenId] = useState<string>("");
  return (
    <TableContainer
      component={Paper}
      sx={{ width: "100%", border: "solid 0.1em grey", shadow: "inherit" }}
    >
      <ModalMedicine
        open={!!openId}
        onClose={() => setOpenId("")}
        onOk={() => {}}
        title="Edit Medicine"
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
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left" component="th" scope="row">
                {data.name}
              </TableCell>
              <TableCell align="left">{data.category}</TableCell>
              <TableCell align="left">{data.usage}</TableCell>
              <TableCell align="left">{data.packaging}</TableCell>
              <TableCell align="left">{data.stockQuantity}</TableCell>
              <TableCell align="left" size="medium">
                <Button variant="outlined" sx={{ fontSize: "13px" }} onClick={() => setOpenId(data.name)}>
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
