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
import { useEffect, useState } from "react";
import roomService, { Room } from "../../services/room-service";

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
  const getCurrentStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      "10Full": "#409832",
      "1 bed available": "#409832",
      Available: "#409832",
      "In use": "#B1190F",
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
    // console.log(data);
    roomService
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
        }}
        onOk={onSubmit}
        title="Edit Room"
        item={selectedRoomDetail}
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
                <IconButton
                  size="medium"
                  sx={{ ml: 3 }}
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
