import { TextField, Button, Box, Typography, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import pathwayService, { Pathway } from "../../../services/pathway-service";
import userService, { User } from "../../../services/user-service";
import procedureService, {
  Procedure,
} from "../../../services/procedure-service";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "#5C6B73",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  borderRadius: 2,
};

const textFieldStyles = {
  "& label.Mui-focused": {
    color: "white",
  },
  "& label": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
    "& input": {
      color: "white",
    },
    "& textarea": {
      color: "white",
    },
  },
  my: 2,
};
interface Props {
  pathway: Pathway;
  handleClose: () => void;
}

export default function AddProcedureModal({ pathway, handleClose }: Props) {
  const [procedureName, setProcedureName] = useState("");
  const [caregiversNames, setCaregiversNames] = useState([""]);
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [details, setDetails] = useState("");
  const [allUsers, setAllUsers] = useState<User[]>([]);

  useEffect(() => {
    userService.getAll<User>().then(res => setAllUsers(res.data));
  }, []);

  const handleCaregiverChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newCaregiversNames = [...caregiversNames];
    newCaregiversNames[index] = event.target.value;
    setCaregiversNames(newCaregiversNames);
  };

  const addCaregiverField = () => {
    setCaregiversNames([...caregiversNames, ""]);
  };

  const removeCaregiverField = (index: number) => {
    const newCaregiversNames = [...caregiversNames];
    newCaregiversNames.splice(index, 1);
    setCaregiversNames(newCaregiversNames);
  };

  const confirmAddProcedure = () => {
    const caregivers: User[] = [];
    for (let user of allUsers) {
      if (caregiversNames.includes(user.name)) caregivers.push(user);
    }

    console.log(caregivers);

    const newProcedure: Procedure = {
      name: procedureName,
      caregiver: caregivers,
      location: location,
      start: new Date(startTime),
      end: new Date(startTime),
      details: details,
      patient: pathway.patient,
      status: "waiting",
    };

    procedureService
      .create(newProcedure)
      .then(res => {
        const updatedPathway: Pathway = {
          ...pathway,
          procedures: [...pathway.procedures, res.data._id as string],
        };
        pathwayService
          .updateById<Pathway>(pathway._id as string, updatedPathway)
          .then(res => console.log(res.data))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));

    handleClose();
  };

  return (
    <div>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby='procedure-modal-title'
      >
        <Box sx={style}>
          <Typography
            id='procedure-modal-title'
            variant='h6'
            component='h2'
            color='common.white'
          >
            Procedure Information
          </Typography>
          <TextField
            required
            id='procedure-name'
            label='Procedure Name'
            value={procedureName}
            onChange={event => setProcedureName(event.target.value)}
            sx={textFieldStyles}
          />
          {caregiversNames.map((caregiver, index) => (
            <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
              <TextField
                required
                label='Caregiver'
                value={caregiver}
                onChange={event => handleCaregiverChange(index, event)}
                sx={{ ...textFieldStyles, flex: 1 }}
              />
              <Button
                onClick={() => removeCaregiverField(index)}
                sx={{ mx: 1 }}
              >
                Remove
              </Button>
            </Box>
          ))}
          <Button onClick={addCaregiverField} sx={{ my: 2 }}>
            Add Caregiver
          </Button>
          <TextField
            required
            id='location'
            label='Location'
            value={location}
            onChange={event => setLocation(event.target.value)}
            sx={textFieldStyles}
          />
          <TextField
            required
            id='start-time'
            label='Start Time'
            type='datetime-local'
            value={startTime}
            onChange={e => setStartTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            sx={textFieldStyles}
          />
          <TextField
            required
            id='end-time'
            label='End Time'
            type='datetime-local'
            value={endTime}
            onChange={e => setEndTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            sx={textFieldStyles}
          />

          <TextField
            id='procedure-detail'
            label='Procedure Detail'
            value={details}
            onChange={event => setDetails(event.target.value)}
            multiline
            rows={4}
            sx={textFieldStyles}
          />
          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-around" }}>
            <Button
              variant='contained'
              color='primary'
              style={{ backgroundColor: "#253237", color: "#ffffff" }}
              onClick={confirmAddProcedure}
            >
              Confirm
            </Button>
            <Button
              variant='contained'
              color='primary'
              style={{ backgroundColor: "#253237", color: "#ffffff" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}