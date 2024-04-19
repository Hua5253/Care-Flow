import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { Pathway } from "../../../services/pathway-service";

interface Props {
  inEdit: boolean;
  pathway: Pathway | null;
  handleDeleteProcedure: () => void;
}

function ProcedureList({ inEdit, pathway, handleDeleteProcedure }: Props) {
  const procedures = pathway?.procedures;

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
        {procedures?.map((procedure, index) => (
          <TableRow key={index} hover sx={{ cursor: "pointer" }}>
            <TableCell>{procedure.start.toLocaleDateString()}</TableCell>
            <TableCell>{procedure.start.toLocaleTimeString()}</TableCell>
            <TableCell>{procedure.details}</TableCell>
            <TableCell>{procedure.status}</TableCell>
            <TableCell>{procedure.location}</TableCell>
            <TableCell>
              {inEdit && (
                <div>
                  <Button
                    variant='outlined'
                    size='small'
                    sx={{ marginRight: "8px" }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant='outlined'
                    size='small'
                    onClick={handleDeleteProcedure}
                  >
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
