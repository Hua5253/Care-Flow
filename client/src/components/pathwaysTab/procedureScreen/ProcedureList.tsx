import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";

const procedures = [
  {
    date: "Aug 24",
    time: "12:30 PM",
    procedure: "MRI",
    status: "N/A",
    location: "Room 2021",
  },
  {
    date: "Aug 25",
    time: "1:45 PM",
    procedure: "CT",
    status: "N/A",
    location: "Room 2076",
  },
];

interface Props {
  inEdit: boolean;
  handleDeleteProcedure: () => void;
}

function ProcedureList({ inEdit, handleDeleteProcedure }: Props) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Time</TableCell>
          <TableCell>Procedure</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Location</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {procedures.map((procedure, index) => (
          <TableRow key={index} hover sx={{ cursor: "pointer" }}>
            <TableCell>{procedure.date}</TableCell>
            <TableCell>{procedure.time}</TableCell>
            <TableCell>{procedure.procedure}</TableCell>
            <TableCell>{procedure.status}</TableCell>
            <TableCell>{procedure.location}</TableCell>
            <TableCell>
              {inEdit && (
                <div>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ marginRight: "8px" }}
                  >
                    Edit
                  </Button>
                  <Button variant="outlined" size="small" onClick={handleDeleteProcedure}>
                    Delete
                  </Button>
                </div>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ProcedureList;
