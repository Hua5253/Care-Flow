import {
  Box,
  Button,
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
import { useNavigate } from "react-router-dom";
import pathwayService, { Pathway } from "../../../services/pathway-service";
import { useEffect, useState } from "react";

interface Column {
  id: "name" | "patient" | "status" | "open";
  label: string;
  minWidth?: number;
  align?: "center" | "left" | "right";
}

const columns: readonly Column[] = [
  { id: "name", label: "Pathway Name", minWidth: 170 },
  { id: "patient", label: "Patient Name", minWidth: 170, align: "center" },
  { id: "status", label: "Status", minWidth: 170, align: "center" },
  { id: "open", label: "", minWidth: 170, align: "right" },
];

interface showModal {
  showModal: () => void;
}

function Pathways({ showModal }: showModal) {
  const navigate = useNavigate();

  const [pathways, setPathways] = useState<Pathway[]>([]);

  useEffect(() => {
    pathwayService
      .getAll<Pathway>()
      .then((res) => {
        setPathways(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

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
        Pathway
      </Typography>
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          border: "solid 0.1em grey",
          shadow: "inherit",
        }}
      >
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label && (
                      <TableSortLabel active={true} sx={{ fontWeight: 700 }}>
                        {column.label}
                      </TableSortLabel>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {pathways.map((pathway) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={pathway._id}
                  >
                    <TableCell>{pathway.name}</TableCell>
                    <TableCell align={"center"}>{pathway.patient}</TableCell>
                    <TableCell align={"center"}>{pathway.status}</TableCell>
                    <TableCell align={"right"}>
                      <Button
                        variant="contained"
                        sx={{ m: 1 }}
                        onClick={() =>
                          navigate(`/manager-pathway/${pathway._id}`)
                        }
                      >
                        Open
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Button variant="contained" sx={{ m: 1 }} onClick={showModal}>
        Add Pathway
      </Button>
    </Box>
  );
}

export default Pathways;
