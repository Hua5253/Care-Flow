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
import ModalOffice from "./ModalOffice";

interface Officer {
  id: string;
  name: string;
  position: string;
  contactInformation: string;
  responsibilities: string;
}

const dataSource: Officer[] = [
  {
    id: "1",
    name: "Li Ming",
    position: "Hospital Administrator",
    contactInformation: "123-456-7890",
    responsibilities: "overall operation management of the hospital",
  },
  {
    id: "2",
    name: "Zhang Hua",
    position: "Director of Nursing",
    contactInformation: "123-456-7890",
    responsibilities: "Manages the nursing team",
  },
  {
    id: "3",
    name: "Wang Li",
    position: "Chief Pharmacist",
    contactInformation: "123-456-7890",
    responsibilities: "Oversees the operations of the pharmacy department",
  },
  {
    id: "4",
    name: "Zhao Qiang",
    position: "IT Manager",
    contactInformation: "123-456-7890",
    responsibilities: "Manages the hospital's information systems",
  },
];

export default function TableOfficers() {
  const [openId, setOpenId] = useState<string>("");
  return (
    <TableContainer
      component={Paper}
      sx={{ width: "100%", border: "solid 0.1em grey", shadow: "inherit" }}
    >
      <ModalOffice
        open={!!openId}
        onClose={() => setOpenId("")}
        onOk={() => {}}
        title="Edit Officer"
      />
      <Table aria-label="simple table" stickyHeader sx={{ width: "100%" }}>
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ fontWeight: 700 }}>
              <TableSortLabel active={true}>Name</TableSortLabel>
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 700 }}>
              <TableSortLabel active={true}>Position</TableSortLabel>
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 700 }}>
              <TableSortLabel active={true}>Contact Information</TableSortLabel>
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 700 }}>
              <TableSortLabel active={true}>Responsibilities</TableSortLabel>
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
              <TableCell align="left">{data.position}</TableCell>
              <TableCell align="left">{data.contactInformation}</TableCell>
              <TableCell align="left">{data.responsibilities}</TableCell>
              <TableCell align="left" size="medium">
                <Button
                  variant="outlined"
                  sx={{ fontSize: "13px" }}
                  onClick={() => setOpenId(data.name)}
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
