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
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import ModalRoom from "./ModalRoom";
import { useEffect, useState } from "react";
import roomService, { Room } from "../../services/room-service";
import { set } from "react-hook-form";

interface Props {
  dataSource: Room[];
  onEdit: () => void;
  onDelete: () => void;
}

export default function TableRoom({ dataSource, onEdit, onDelete }: Props) {
  const [openId, setOpenId] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedRoomDetail, setSelectedRoomDetail] = useState<Room>(
    {} as Room
  );
  const [error, setError] = useState<string>("");
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Vacant: "#409832",
      "Low Occupancy": "#9ACD32",
      "Moderate Occupancy": "#B1840F",
      "High Occupancy": "#FF8C00",
      "Near Capacity": "#FF4500",
      "Full Capacity": "#B1190F",
    };
    return colors[status] || "#000";
  };

  useEffect(() => {
    if (openId) {
      roomService.getById(openId).then((res) => {
        setSelectedRoomDetail(res.data as Room);
        setShowModal(true);
      });
    }
  }, [openId]);

  //updates the data
  const onSubmit = (data: any) => {
    console.log(Number(data.capacity));
    console.log(Number(data.capacity));
    console.log(
      "current in use: ",
      data.item.capacity - data.item.currentCapacity
    );
    if (
      Number(data.capacity) <
      data.item.capacity - data.item.currentCapacity
    ) {
      setError(
        "Cannot set capacity lower than the number of rooms currently in use"
      );
      if (openId) {
        roomService.getById(openId).then((res) => {
          setSelectedRoomDetail(res.data as Room);
          setShowModal(true);
        });
      }
      return;
    }
    roomService
      .updateById(openId, data)
      .then((res) => {
        console.log("successfully updated ", res.data);
        setShowModal(false);
        setOpenId("");
        onEdit();
        setError("");
      })
      .catch((err): void => {
        console.log(err);
      });
  };

  const handleDelete = (id: string) => {
    roomService
      .deleteById(id)
      .then((res) => {
        console.log("successfully deleted ", res.data);
        setShowModal(false);
        setOpenId("");
        onDelete();
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
      <ModalRoom
        open={showModal}
        onClose={() => {
          setOpenId("");
          setShowModal(false);
          setError("");
        }}
        onOk={onSubmit}
        title="Edit Room"
        item={selectedRoomDetail}
        error={error}
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
            <TableCell align="center" sx={{ fontWeight: 700 }}>
              <TableSortLabel active={true}>
                Capacity (Available / Total)
              </TableSortLabel>
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 700 }}>
              <TableSortLabel active={true}>Current Status</TableSortLabel>
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 700, width: "15%" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        {dataSource.length === 0 && (
          <TableBody>
            <TableRow>
              <TableCell
                align="center"
                colSpan={5}
                sx={{ backgroundColor: "#f5f5f5" }}
              >
                <Typography variant="h5" sx={{ color: "#989A9D" }}>
                  No Data
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        )}
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
              <TableCell align="center">
                {data.currentCapacity} / {data.capacity}
              </TableCell>
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
                <IconButton
                  size="medium"
                  onClick={() => handleDelete(data._id || "")}
                >
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
