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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import procedureService from "../../services/procedure-service";

export default function ViewProcedure() {
  const [procedures, setProcedures] = useState<any>([]);

  const navigate = useNavigate();
  const openProcedure = () => {
    navigate("/procedure/123");
  };

  useEffect(() => {
    async function fetchData() {
      try {
        await procedureService.getAll().then((res) => {
          setProcedures(res.data);
        });
      }
      catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  function formatDate(dateInput: Date | string): string {
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

  function formatTime(timeInput: Date | string): string {
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
    // <Box sx={{ width: '100%', margin: 'auto', padding: '20px' }}>
    <Box
      sx={{
        flexGrow: 1,
        p: 3,
        marginLeft: "6em",
        marginTop: 8,
        width: "100%",
        overflowX: "auto",
        minWidth: 0,
      }}
    >
      <Paper
        sx={{
          width: "95%",
          minHeight: "80vh", // Use vh unit to scale with the viewport height
          backgroundColor: "#9DB4C0",
          padding: 2,
          margin: "auto",
          overflow: "auto",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            whiteSpace: "pre-line",
            backgroundColor: "#E0FBFC",
            padding: 2,
          }}
        >
          Schedule
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ width: "100%" }} aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="left">Time</TableCell>
                <TableCell align="left">Patient</TableCell>
                <TableCell align="left">Procedure</TableCell>
                <TableCell align="left">Location</TableCell>
              </TableRow>
              {procedures.map((procedure: any, index : any) => (
                
                <TableRow
                  key={index}
                  sx={{ backgroundColor: index % 2 === 0 ? "#C2DFE3" : null }}
                >
                  <TableCell>{formatDate(procedure.start)}</TableCell>
                  <TableCell align="left">{formatTime(procedure.start)}</TableCell>
                  <TableCell align="left">{procedure.patient}</TableCell>
                  <TableCell align="left">{procedure.name}</TableCell>
                  <TableCell align="left">{procedure.location}</TableCell>
                  <TableCell align="left">
                    <Button onClick={openProcedure}>Open</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
