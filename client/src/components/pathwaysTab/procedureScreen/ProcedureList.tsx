import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { Pathway } from "../../../services/pathway-service";
import { useEffect, useState } from "react";
import procedureService, {
  Procedure,
} from "../../../services/procedure-service";

interface Props {
  inEdit: boolean;
  pathway: Pathway;
  handleDeleteProcedure: (id: string) => void;
  handleEditProcedure: (id: string) => void;
}

function ProcedureList({
  inEdit,
  pathway,
  handleDeleteProcedure,
  handleEditProcedure,
}: Props) {
  const [allProcedures, setAllProcedures] = useState<Procedure[]>([]);
  useEffect(() => {
    procedureService
      .getAll<Procedure>()
      .then((res) => setAllProcedures(res.data))
      .catch((err) => console.log(err));
  }, [pathway.procedures]);

  const procedures: Procedure[] = [];

  for (let procedure of allProcedures) {
    if (pathway.procedures?.includes(procedure._id as string))
      procedures.push(procedure);
  }

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
            <TableCell>
              {toLocalDateString(procedure.start.toString())}
            </TableCell>
            <TableCell>
              {toLocalTimeString(procedure.start.toString())}
            </TableCell>
            <TableCell>{procedure.name}</TableCell>
            <TableCell>{procedure.status}</TableCell>
            <TableCell>{procedure.location}</TableCell>
            <TableCell>
              {inEdit && (
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
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function toLocalDateString(isoString: string) {
  const date = new Date(isoString);
  function pad(value: number): string {
    return value.toString().padStart(2, "0");
  }
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());

  return `${year}-${month}-${day}`;
}

function toLocalTimeString(isoString: string) {
  const date = new Date(isoString);
  function pad(value: number): string {
    return value.toString().padStart(2, "0");
  }

  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${hours}:${minutes}`;
}

export default ProcedureList;
