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
import ModalRoom from "./ModalRoom";
import { useState } from "react";
import { Room } from "../../services/room-service";

// interface Room {
//   id: string;
//   roomName: string;
//   roomNumber: string;
//   capacity: string;
//   currentStatus: string;
// }

// const dataSource: Room[] = [
//   {
//     id: "1",
//     roomName: "General Ward",
//     roomNumber: "101A",
//     capacity: "4 beds",
//     currentStatus: "10Full",
//   },
//   {
//     id: "2",
//     roomName: "ICU",
//     roomNumber: "201",
//     capacity: "2 beds",
//     currentStatus: "1 bed available",
//   },
//   {
//     id: "3",
//     roomName: "Operating Room",
//     roomNumber: "OR-3",
//     capacity: "1 operating table",
//     currentStatus: "Available",
//   },
//   {
//     id: "4",
//     roomName: "Examination Room",
//     roomNumber: "102B",
//     capacity: "1 examination table",
//     currentStatus: "In use",
//   },
// ];

interface Props {
  dataSource: Room[];
}

export default function TableRoom({ dataSource }: Props) {
  const [openId, setOpenId] = useState<string>("");
  const getCurrentStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      "10Full": "#409832",
      "1 bed available": "#409832",
      Available: "#409832",
      "In use": "#B1190F",
    };
    return colors[status] || "#000";
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ width: "100%", border: "solid 0.1em grey", shadow: "inherit" }}
    >
      <ModalRoom
        open={!!openId}
        onClose={() => setOpenId("")}
        onOk={() => {}}
        title="Edit Room"
      />
      <Table aria-label="simple table" stickyHeader sx={{ width: "100%" }}>
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ fontWeight: 700 }}>
              <TableSortLabel active={true}>Room Name</TableSortLabel>
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 700 }}>
              <TableSortLabel active={true}>Room Number</TableSortLabel>
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 700 }}>
              <TableSortLabel active={true}>Capacity</TableSortLabel>
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 700 }}>
              <TableSortLabel active={true}>Current Status</TableSortLabel>
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
              <TableCell align="left">{data.location}</TableCell>
              <TableCell align="left">{data.capacity}</TableCell>
              <TableCell
                align="left"
                style={{ color: getCurrentStatusColor(data.status) }}
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
