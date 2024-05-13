import { TextField, Button, Box, Typography, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import pathwayService, { Pathway } from "../../../services/pathway-service";
import userService, { User } from "../../../services/user-service";
import procedureService, {
  Procedure,
} from "../../../services/procedure-service";
import { socket } from "../../../socket";

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
  addProcedureToPathway: (id: string) => void;
}

export default function AddProcedureModal({
  pathway,
  handleClose,
  addProcedureToPathway,
}: Props) {
  const [procedureName, setProcedureName] = useState("");
  const [caregiversNames, setCaregiversNames] = useState([""]);
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [details, setDetails] = useState("");
  const [allUsers, setAllUsers] = useState<User[]>([]);

  const [errors, setErrors] = useState({
    procedureName: "",
    caregivers: "",
    location: "",
    startTime: "",
    endTime: "",
    details: "",
  });

  useEffect(() => {
    userService.getAll<User>().then((res) => setAllUsers(res.data));
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
    if (!validate()) return;

    const profile = JSON.parse(localStorage.getItem("profile") || "{}");
    const caregivers: string[] = [];
    for (let user of allUsers) {
      if (caregiversNames.includes(user.name))
        caregivers.push(user._id as string);
    }

    const newProcedure: Procedure = {
      posterId: profile._id,
      name: procedureName,
      caregiver: caregivers,
      location: location,
      start: new Date(startTime),
      end: new Date(endTime),
      details: details,
      patient: pathway.patient,
      status: "unpublished",
    };

    procedureService
      .create(newProcedure)
      .then((res) => {
        addProcedureToPathway(res.data._id);
        const updatedPathway: Pathway = {
          ...pathway,
          procedures: [...pathway.procedures, res.data._id as string],
        };
        if (newProcedure.caregiver && newProcedure.caregiver.length > 0) {
          console.log(newProcedure.caregiver);
          for (const receiverId of newProcedure.caregiver) {
            socket.emit("notification", {
              receiverId,
              content: details,
            });
          }
        }
        pathwayService
          .updateById<Pathway>(pathway._id as string, updatedPathway)
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));

    handleClose();
  };

  const validate = () => {
    let isValid = true;
    let newErrors = {
      procedureName: "",
      caregivers: "",
      location: "",
      startTime: "",
      endTime: "",
      details: "",
    };

    if (!procedureName.trim()) {
      newErrors.procedureName = "Procedure name is required.";
      isValid = false;
    }
    if (
      caregiversNames.length === 0 ||
      caregiversNames.every((name) => !name.trim())
    ) {
      newErrors.caregivers = "At least one caregiver is required.";
      isValid = false;
    }
    if (!location.trim()) {
      newErrors.location = "Location is required.";
      isValid = false;
    }
    if (!startTime.trim()) {
      newErrors.startTime = "Start time is required.";
      isValid = false;
    }
    if (!endTime.trim()) {
      newErrors.endTime = "End time is required.";
      isValid = false;
    } else if (new Date(startTime) >= new Date(endTime)) {
      newErrors.endTime = "End time must be later than start time.";
      isValid = false;
    }
    if (!details.trim()) {
      newErrors.details = "Details are required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <div>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="procedure-modal-title"
      >
        <Box sx={style}>
          <Typography
            id="procedure-modal-title"
            variant="h6"
            component="h2"
            color="common.white"
          >
            Procedure Information
          </Typography>
          <TextField
            required
            id="procedure-name"
            label="Procedure Name"
            value={procedureName}
            onChange={(event) => setProcedureName(event.target.value)}
            error={!!errors.procedureName}
            helperText={errors.procedureName}
            sx={textFieldStyles}
          />
          {caregiversNames.map((caregiver, index) => (
            <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
              <TextField
                required
                label="Caregiver"
                value={caregiver}
                onChange={(event) => handleCaregiverChange(index, event)}
                error={!!errors.caregivers && index === 0}
                helperText={index === 0 ? errors.caregivers : ""}
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
            id="location"
            label="Location"
            value={location}
            onChange={(event) => {
              setLocation(event.target.value);
              setErrors((prev) => ({ ...prev, location: "" }));
            }}
            error={!!errors.location}
            helperText={errors.location}
            sx={textFieldStyles}
          />
          <TextField
            required
            id="start-time"
            label="Start Time"
            type="datetime-local"
            value={startTime}
            onChange={(e) => {
              setStartTime(e.target.value);
              setErrors((prev) => ({ ...prev, startTime: "", endTime: "" }));
            }}
            error={!!errors.startTime}
            helperText={errors.startTime}
            InputLabelProps={{
              shrink: true,
            }}
            sx={textFieldStyles}
          />
          <TextField
            required
            id="end-time"
            label="End Time"
            type="datetime-local"
            value={endTime}
            onChange={(e) => {
              setEndTime(e.target.value);
              setErrors((prev) => ({ ...prev, endTime: "" }));
            }}
            error={!!errors.endTime}
            helperText={errors.endTime}
            InputLabelProps={{
              shrink: true,
            }}
            sx={textFieldStyles}
          />

          <TextField
            id="procedure-detail"
            label="Procedure Detail"
            value={details}
            onChange={(event) => {
              setDetails(event.target.value);
              setErrors((prev) => ({ ...prev, details: "" })); 
            }}
            error={!!errors.details}
            helperText={errors.details}
            multiline
            rows={4}
            sx={textFieldStyles}
          />
          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-around" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ backgroundColor: "#253237", color: "#ffffff" }}
              onClick={confirmAddProcedure}
            >
              Confirm
            </Button>
            <Button
              variant="contained"
              color="primary"
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
