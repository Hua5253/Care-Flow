import { Procedure } from "../../../services/procedure-service";
import { Pathway } from "../../../services/pathway-service";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

interface Props {
  templatePathway: Pathway;
  allProcedures: Procedure[];
  handleDeleteProcedure: (id: string) => void;
  handleEditProcedure: (id: string) => void;
}

function TemplateProcedureList({
  templatePathway,
  allProcedures,
  handleDeleteProcedure,
  handleEditProcedure,
}: Props) {
  const procedures: Procedure[] = [];

  for (let procedure of allProcedures) {
    if (templatePathway.procedures?.includes(procedure._id as string))
      procedures.push(procedure);
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Procedure Name</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {procedures?.map((procedure, index) => (
          <TableRow key={index} hover sx={{ cursor: "pointer" }}>
            <TableCell>{procedure.name}</TableCell>
            <TableCell align="right">
              <div>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ marginRight: "8px" }}
                  onClick={() => handleEditProcedure(procedure._id as string)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleDeleteProcedure(procedure._id as string)}
                >
                  Delete
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default TemplateProcedureList;
