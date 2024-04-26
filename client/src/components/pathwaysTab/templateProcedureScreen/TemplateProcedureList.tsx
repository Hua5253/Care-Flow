import { useEffect, useState } from "react";
import procedureService, {
  Procedure,
} from "../../../services/procedure-service";
import pathwayService, { Pathway } from "../../../services/pathway-service";
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
}

function TemplateProcedureList({ templatePathway }: Props) {
  const [allProcedures, setAllProcedures] = useState<Procedure[]>([]);

  useEffect(() => {
    procedureService
      .getAll<Procedure>()
      .then(res => setAllProcedures(res.data))
      .catch(err => console.log(err));
  }, []);

  const procedures: Procedure[] = [];

  for (let procedure of allProcedures) {
    if (templatePathway.procedures?.includes(procedure._id as string))
      procedures.push(procedure);
  }

  const handleDeleteProcedure = (id: string) => {
    procedureService.deleteById<Procedure>(id).catch(err => console.log(err));

    const updatedProcedures: string[] = templatePathway.procedures.filter(
      procedure => procedure !== id
    );

    const updatedTemplatePathway: Pathway = {
      ...templatePathway,
      procedures: updatedProcedures,
    };

    pathwayService.updateById<Pathway>(templatePathway._id as string, updatedTemplatePathway);
  };

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
            <TableCell align='right'>
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
