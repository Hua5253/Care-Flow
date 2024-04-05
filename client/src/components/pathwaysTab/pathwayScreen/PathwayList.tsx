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
} from "@mui/material";

interface Column {
  id: "name" | "patient" | "status" | "open";
  label: string;
  minWidth?: number;
  align?: "center" | "left" | "right";
}

interface PathwayData {
  id: number;
  name: string;
  patient: string;
  status: "ongoing" | "completed" | "waiting" | "unpublished";
}

const columns: readonly Column[] = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "patient", label: "Patient", minWidth: 170, align: "center" },
  { id: "status", label: "Status", minWidth: 170, align: "center" },
  { id: "open", label: "", minWidth: 170, align: "right" },
];

const pathways: PathwayData[] = [
  { id: 1, name: "pathway1", patient: "KJ", status: "waiting" },
  { id: 2, name: "pathway2", patient: "Sab", status: "waiting" },
  { id: 3, name: "pathway3", patient: "sdsdc", status: "ongoing" },
  { id: 4, name: "pathway4", patient: "Pandamini", status: "completed" },
];

interface showModal {
  showModal: () => void;
}

function Pathways({ showModal }: showModal) {
  return (
    <Box sx={{ flexGrow: 1, p: 7 }}>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
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
                    {column.label}
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
                    key={pathway.id}
                  >
                    <TableCell>{pathway.name}</TableCell>
                    <TableCell align={"center"}>{pathway.patient}</TableCell>
                    <TableCell align={"center"}>{pathway.status}</TableCell>
                    <TableCell align={"right"}>
                      <Button variant="contained" sx={{ m: 1 }}>
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
