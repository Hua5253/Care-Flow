import { useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import { Pathway } from "../../../services/pathway-service";
import { useNavigate } from "react-router-dom";
import pathwayService from "../../../services/pathway-service";

interface Prop {
    open: boolean;
    handleClose: () => void;
}

function BlankPathwayFormModal({ open, handleClose }: Prop) {
    const [pathwayName, setName] = useState("");
    const [patient, setPatient] = useState("");

    const navigate = useNavigate();

    const handleSubmit = () => {
        let newPathway: Pathway = {
            name: pathwayName,
            patient: patient,
            status: "unpublished",
            is_template: false,
            procedures: [],
        };

        console.log(newPathway);

        pathwayService
            .create(newPathway)
            .then()
            .catch(err => console.log(err));

        handleClose();

        navigate("/manager-procedure");
    };

    const modalStyle = {
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "#5C6B73",
        boxShadow: 24,
        p: 4,
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='blank-pathway-modal-title'
        >
            <Box sx={modalStyle}>
                <Typography
                    id='blank-pathway-modal-title'
                    variant='h6'
                    component='h2'
                >
                    Create New Pathway
                </Typography>
                <TextField
                    fullWidth
                    margin='normal'
                    required
                    label='Pathway Name'
                    value={pathwayName}
                    onChange={e => setName(e.target.value)}
                />
                <TextField
                    fullWidth
                    margin='normal'
                    required
                    label='Patient'
                    value={patient}
                    onChange={e => setPatient(e.target.value)}
                />
                <Box
                    sx={{
                        mt: 2,
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Button variant='contained' onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={handleSubmit}
                    >
                        Confirm
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default BlankPathwayFormModal;
