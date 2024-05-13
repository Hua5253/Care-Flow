import {
  TextField,
  Button,
  Box,
  Typography,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Pathway } from "../../../services/pathway-service";
import userService, { User } from "../../../services/user-service";
import procedureService, {
  Procedure,
} from "../../../services/procedure-service";
import { UserContext } from "../UserContext";

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
  modalOpen: boolean;
  handleClose: () => void;
  procedureToEditId: string;
  pathway: Pathway;
  refetchProcedures: () => void;
}

export default function EditProcedureModal({
  modalOpen,
  handleClose,
  procedureToEditId,
  pathway,
  refetchProcedures,
}: Props) {
  const [procedureName, setProcedureName] = useState("");
  const [caregiversNames, setCaregiversNames] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState<"ongoing" | "completed" | "waiting" | "canceled" | "unpublished">("unpublished");
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [errors, setErrors] = useState({
    procedureName: "",
    caregivers: "",
    location: "",
    startTime: "",
    endTime: "",
    details: "",
  });
  const users = useContext(UserContext);

  useEffect(() => {
    userService.getAll<User>().then((res) => setAllUsers(res.data));
  }, []);
  

  useEffect(() => {
    procedureService
      .getById<Procedure>(procedureToEditId)
      .then(({ data: procedure }) => {
        setProcedureName(procedure.name || "");
        setLocation(procedure.location || "");
        const caregiverIds = procedure.caregiver;
        if (caregiverIds && caregiverIds.length > 0) {
          setCaregiversNames([]);

          caregiverIds.forEach((id) => {
            userService
              .getById<User>(id)
              .then(({ data: user }) => {
                setCaregiversNames((prevNames) => [...prevNames, user.name]);
              })
              .catch((err) => console.log(err));
          });
        } else {
          setCaregiversNames([]);
        }
        setStartTime(toLocalDateTimeString(procedure.start?.toString()) || "");
        setEndTime(toLocalDateTimeString(procedure.end?.toString()) || "");
        setStatus(procedure.status);
        setDetails(procedure.details || "");
      })
      .catch((err) => console.log(err));
  }, [procedureToEditId]);

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

  const confirmEditProcedure = () => {
    if (!validate()) return;

    const caregivers: string[] = [];
    for (let user of allUsers) {
      if (caregiversNames.includes(user.name))
        caregivers.push(user._id as string);
    }

    console.log(caregivers);

    const updatedProcedure: Procedure = {
      name: procedureName,
      caregiver: caregivers,
      location: location,
      start: new Date(startTime),
      end: new Date(endTime),
      details: details,
      patient: pathway.patient,
      status: status,
    };

    procedureService
      .updateById(procedureToEditId, updatedProcedure)
      .then(() => refetchProcedures())
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
        open={modalOpen}
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
            onChange={(event) => {
              setProcedureName(event.target.value);
              setErrors((prev) => ({ ...prev, procedureName: "" }));
            }}
            error={!!errors.procedureName}
            helperText={errors.procedureName}
            sx={textFieldStyles}
          />
          {caregiversNames.map((caregiver, index) => (
            <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
              {/* <TextField
                required
                label="Caregiver"
                value={caregiver}
                onChange={(event) => {
                  handleCaregiverChange(index, event);
                  setErrors((prev) => ({ ...prev, caregivers: "" }));
                }}
                error={!!errors.caregivers && index === 0}
                helperText={index === 0 ? errors.caregivers : ""}
                sx={{ ...textFieldStyles, flex: 1 }}
              /> */}

              <FormControl
                fullWidth
                required
                error={!!errors.caregivers && index === 0}
                sx={{ ...textFieldStyles, flex: 1 }}
              >
                <InputLabel>Caregiver</InputLabel>
                <Select
                  value={caregiver}
                  label="Caregiver"
                  onChange={(event: any) => {
                    handleCaregiverChange(index, event);
                    setErrors((prev) => ({ ...prev, caregivers: "" }));
                  }}
                  sx={{
                    color: "white",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                    "& .MuiSvgIcon-root": {
                      color: "white",
                    },
                  }}
                >
                  {users.map((name, index) => (
                    <MenuItem key={index} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                onClick={() => removeCaregiverField(index)}
                sx={{ mx: 1, color: "red" }}
              >
                Remove
              </Button>
            </Box>
          ))}
          <Button
            onClick={addCaregiverField}
            sx={{
              my: 2,
              color: "common.white",
              border: "solid black",
              backgroundColor: "#253237",
              "& hover": {
                backgroundColor: "#253600",
              },
            }}
          >
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
              style: { color: "white" },
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
              style: { color: "white" },
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
              onClick={confirmEditProcedure}
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

function toLocalDateTimeString(isoString: string) {
  const date = new Date(isoString);
  function pad(value: number): string {
    return value.toString().padStart(2, "0");
  }
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}
