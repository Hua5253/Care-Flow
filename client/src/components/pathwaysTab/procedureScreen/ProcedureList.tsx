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
  handleDeleteProcedure: () => void;
}

function ProcedureList({ inEdit, pathway, handleDeleteProcedure }: Props) {
  const [allProcedures, setAllProcedures] = useState<Procedure[]>([]);
  // const [procedures, setProcedures] = useState<Procedure[]>([]);
  useEffect(() => {
    procedureService
      .getAll<Procedure>()
      .then(res => setAllProcedures(res.data))
      .catch(err => console.log(err));
  }, []);

  // useEffect(() => {
  //   procedureService.getAll<Procedure>().then(res => {
  //     for (let procedure of res.data) {
  //       if (pathway.procedures?.includes(procedure._id as string)) {
  //         setProcedures([...procedures, procedure]);
  //       }
  //     }
  //   });
  // }, []);

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
            <TableCell>{procedure.start.toString()}</TableCell>
            <TableCell>{procedure.start.toString()}</TableCell>
            <TableCell>{procedure.name}</TableCell>
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
