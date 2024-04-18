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
    { id: "name", label: "Name", minWidth: 170 },
    { id: "patient", label: "Patient", minWidth: 170, align: "center" },
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
            .then(res => {
                setPathways(res.data);
            })
            .catch(err => console.log(err));
    }, []);

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
                            {pathways.map(pathway => {
                                return (
                                    <TableRow
                                        hover
                                        role='checkbox'
                                        tabIndex={-1}
                                        key={pathway._id}
                                    >
                                        <TableCell>{pathway.name}</TableCell>
                                        <TableCell align={"center"}>
                                            {pathway.patient}
                                        </TableCell>
                                        <TableCell align={"center"}>
                                            {pathway.status}
                                        </TableCell>
                                        <TableCell align={"right"}>
                                            <Button
                                                variant='contained'
                                                sx={{ m: 1 }}
                                                onClick={() =>
                                                    navigate(
                                                        `/pathways/${pathway._id}`
                                                    )
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
            <Button variant='contained' sx={{ m: 1 }} onClick={showModal}>
                Add Pathway
            </Button>
        </Box>
    );
}

export default Pathways;
