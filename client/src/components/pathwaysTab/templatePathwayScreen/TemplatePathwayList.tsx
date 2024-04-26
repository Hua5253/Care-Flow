import { useEffect, useState } from "react";
import { Pathway } from "../../../services/pathway-service";
import templatePathwayService from "../../../services/template-pathway-service";
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
import procedureService from "../../../services/procedure-service";
import { useNavigate } from "react-router-dom";
interface Column {
  id: "name" | "open";
  label: string;
  minWidth?: number;
  align?: "center" | "left" | "right";
}

const columns: readonly Column[] = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "open", label: "", minWidth: 170, align: "right" },
];

interface Props {
  handleAddPathwayClick: () => void;
}

function TemplatePathwayList({ handleAddPathwayClick }: Props) {
  const [templatePathways, setTemplatePathways] = useState<Pathway[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    templatePathwayService
      .getAll<Pathway>()
      .then(({ data: templatePathways }) =>
        setTemplatePathways(templatePathways)
      )
      .catch(err => console.log(err));
  }, []);

  const handleDeleteTemplatePathway = (id: string) => {
    templatePathwayService
      .deleteById<Pathway>(id)
      .then(({ data: pathway }) => {
        const newTemplatePathways = templatePathways.filter(
          templatePathway => templatePathway._id !== pathway._id
        );
        setTemplatePathways(newTemplatePathways);
      })
      .catch(err => console.log(err));
    templatePathwayService
      .getById<Pathway>(id)
      .then(({ data: templatePathway }) => {
        for (let procedureId of templatePathway.procedures) {
          procedureService
            .deleteById(procedureId)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
        }
      });
  };

  return (
    <Box sx={{ flexGrow: 1, p: 7 }}>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map(column => (
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
              {templatePathways.map(templatePathway => {
                return (
                  <TableRow
                    hover
                    role='checkbox'
                    tabIndex={-1}
                    key={templatePathway._id}
                  >
                    <TableCell>{templatePathway.name}</TableCell>
                    <TableCell align={"right"}>
                      <Button
                        variant='contained'
                        sx={{ m: 1 }}
                        onClick={() =>
                          navigate(
                            "/template-pathways" + "/" + templatePathway._id
                          )
                        }
                      >
                        Open
                      </Button>
                      <Button
                        variant='contained'
                        sx={{ m: 1 }}
                        onClick={() =>
                          handleDeleteTemplatePathway(
                            templatePathway._id as string
                          )
                        }
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Button variant='contained' sx={{ m: 1 }} onClick={handleAddPathwayClick}>
        Add Pathway
      </Button>
    </Box>
  );
}

export default TemplatePathwayList;
