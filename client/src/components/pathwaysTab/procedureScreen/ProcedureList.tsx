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

const ProcedureList = () => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Time</TableCell>
          <TableCell>Procedure</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Location</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {procedures.map((procedure, index) => (
          <TableRow key={index}>
            <TableCell>{procedure.date}</TableCell>
            <TableCell>{procedure.time}</TableCell>
            <TableCell>{procedure.procedure}</TableCell>
            <TableCell>{procedure.status}</TableCell>
            <TableCell>{procedure.location}</TableCell>
            <TableCell>
              <Button variant="outlined" size="small">
                Open
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProcedureList;
