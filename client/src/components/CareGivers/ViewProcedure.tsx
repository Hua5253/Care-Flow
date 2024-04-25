import * as React from "react";
import { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Button,
  Box,
  TextField,
} from "@mui/material";
import procedureService, {Procedure} from "../../services/procedure-service";
import { useParams } from "react-router-dom";

import StartProcedureModal from "./Modals/StartProcedureModal";
import CancelProcedureModal from "./Modals/CancelProcedureModal";
import EndProcedureModal from "./Modals/EndProcedureModal";

export default function ViewProcedure() {
  const [isEditing, setEditMode] = useState(false);
  const {id} = useParams();
  
  const [showStartProcedureModal, setShowStartProcedureModal] = useState(false);
  const [showEndProcedureModal, setShowEndProcedureModal] = useState(false);
  const [showCancelProcedureModal, setShowCancelProcedureModal] = useState(false);

  const [text, setText] = useState("");
  const [procedure, setProcedure] = useState<Procedure>();
  const [procedureStatus, setStatus] = useState("");

  //fetches the procedure data based on id
  useEffect(() => {
    const fetchProcedure = async () => {
      try {
        procedureService.getById<Procedure>(id as string).then((res) => setProcedure(res.data))
      } catch (error) {
        console.error('Failed to fetch procedures:', error);
      }
    }
    fetchProcedure();
  }, []);

  //changes the details based on procedure details
  useEffect(() => {
    if (procedure) {
      setText(procedure.details);
      setStatus(procedure.status);
    }
  }, [procedure]);

  

  //handles editing mode 
  const handleEditClick = () => {
    setEditMode(true);
  };

  //saves edited chances
  const handleSaveClick = () => {
    setEditMode(false);
  };

  //cancels edited changes 
  const handleCancelSaveClick = () => {
    setEditMode(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setText(event.target.value);

  //handles start procedure
  const handleStartProcedure = () => {
    setShowStartProcedureModal(false)
  };

  //handles ending a procedure
  const handleEndProcedure = () => {
    setShowEndProcedureModal(false)
  };

  //handles canceling a procedure
  const handleCancelProcedure = () => {
    setShowCancelProcedureModal(false)
  };

  function formatDate(dateInput: Date | string| undefined): string {
    if (!dateInput) {
      return "No time available";
    }
    let date: Date;
    if (dateInput instanceof Date) {
      date = dateInput;
    } else {
      // Attempt to create a Date object from the string input
      date = new Date(dateInput);
    }
    // Formate to month, date, year format
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  }

  function formatTime(timeInput: Date | string | undefined): string {
    if (!timeInput) {
      return "No time available";
    }
    let time: Date;
    if (timeInput instanceof Date) {
      time = timeInput;
    } else {
      // Attempt to create a Date object from the string input
      time = new Date(timeInput);
    }
    // Format time to 12-hour AM/PM format
    return time.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: true });
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 3,
        marginLeft: "6em",
        marginTop: 6,
        width: "100%",
        overflowX: "auto",
        minWidth: 0,
      }}
    >
      <Paper
        sx={{
          width: "90%",
          padding: 2,
          margin: "auto",
          maxWidth: "none",
          backgroundColor: "#9DB4C0",
          flexGrow: 1,
          overflow: "hidden", // Add this to handle overflow if the content exceeds the viewport width
        }}
      >
        <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
          <Table sx={{ width: "100%" }} aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell align="left">Procedure</TableCell>
                <TableCell align="left">Patient</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Time</TableCell>
                <TableCell align="left">Location</TableCell>
                <TableCell align="left">Status</TableCell>
              </TableRow>
              <TableRow sx={{ backgroundColor: "#C2DFE3" }}>
                <TableCell align="left">{procedure?.name}</TableCell>
                <TableCell align="left">{procedure?.patient}</TableCell>
                <TableCell align="left">{formatDate(procedure?.start)}</TableCell>
                <TableCell align="left">{formatTime(procedure?.start)}</TableCell>
                <TableCell align="left">{procedure?.location}</TableCell>
                <TableCell align="left">{procedureStatus}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {isEditing ? (
          <TextField
            fullWidth
            multiline
            minRows={4}
            value={text}
            onChange={handleChange}
            variant="outlined"
            sx={{
              backgroundColor: "#FFFFFF",
              margin: "16px 0",
              minHeight: "500px",
            }}
          />
        ) : (
          <Typography
            variant="body1"
            gutterBottom
            sx={{
              whiteSpace: "pre-line",
              backgroundColor: "#E0FBFC",
              padding: 2,
              minHeight: "500px",
            }}
          >
            {text}
          </Typography>
        )}
        <Box>
          {isEditing ? (
            <Box>
              <Button
                variant="contained"
                onClick={handleSaveClick}
                sx={{ backgroundColor: "#5C6B73", marginRight: "8px" }}
              >
                Save changes
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{ backgroundColor: "#5C6B73" }}
                onClick={handleCancelSaveClick}
              >
                Cancel edit
              </Button>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 2,
              }}
            >
              <Box>
                <Button
                  variant="contained"
                  onClick={() => setShowStartProcedureModal(true)}
                  sx={{ backgroundColor: "#5C6B73", marginRight: "8px" }}
                >
                  Start procedure
                </Button>
                <Button
                  variant="contained"
                  onClick={() => setShowEndProcedureModal(true)}
                  sx={{ backgroundColor: "#5C6B73", marginRight: "8px" }}
                >
                  End procedure
                </Button>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  onClick={handleEditClick}
                  sx={{ backgroundColor: "#5C6B73", marginRight: "8px" }}
                >
                  Edit procedure
                </Button>
                <Button
                  variant="contained"
                  onClick={() => setShowCancelProcedureModal(true)}
                  color="error"
                  sx={{ backgroundColor: "#5C6B73" }}
                >
                  Cancel procedure
                </Button>
              </Box>
            </Box>
          )}
        </Box>
        <StartProcedureModal
          open = {showStartProcedureModal}
          handleConfirm={handleStartProcedure}
          handleCancel={() => setShowStartProcedureModal(false)}
        />
        <EndProcedureModal
          open = {showEndProcedureModal}
          handleConfirm={handleEndProcedure}
          handleCancel={() => setShowEndProcedureModal(false)}
        />
        <CancelProcedureModal
          open = {showCancelProcedureModal}
          handleConfirm={handleCancelProcedure}
          handleCancel={() => setShowCancelProcedureModal(false)}
        />
      </Paper>
    </Box>
  );
}
