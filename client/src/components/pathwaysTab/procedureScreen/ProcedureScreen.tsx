import { Box, Container } from "@mui/material";
import ProcedureBanner from "./ProcedureBanner";
import ProcedureList from "./ProcedureList";
import AppBanner from "../../AppBanner/AppBanner";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import pathwayService, { Pathway } from "../../../services/pathway-service";
import DeleteProcedureModal from "../modals/DeleteProcedureModal";
import AddProcedureModal from "../modals/AddProcedureModal";
import ManagerSideBar from "../../SideBar/ManagerSideBar";
import ProcedureButtons from "./ProcedureButtons";
import DeletePathwayModal from "../modals/DeletePathwayModal";
import procedureService, {Procedure} from "../../../services/procedure-service";
import EditProcedureModal from "../modals/EditProcedureModal";

function ProcedureScreen() {
  const [inEdit, setInEdit] = useState(false);
  const [showDeleteProcedureModal, setShowDeleteProcedureModal] =
    useState(false);
  const [showAddProcedureModal, setShowAddProcedureModal] = useState(false);
  const [showDeletePathwayModal, setShowDeletePathwayModal] = useState(false);
  const [showEditProcedureModal, setShowEditProcedureModal] = useState(false);
  const [procedureToEditId, setProcedureToEditId] = useState("");
  const [procedureToDeleteId, setProcedureToDeleteId] = useState("");

  const { id } = useParams();

  const [pathway, setPathway] = useState<Pathway>({} as Pathway);
  const [refetchToggle, setRefetchToggle] = useState(false);

  const navigate = useNavigate();

  const toggleRefetch = () => {
    setRefetchToggle((prev) => !prev);
  };

  useEffect(() => {
    pathwayService
      .getById<Pathway>(id as string)
      .then((res) => setPathway(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDeletePathway = (id: string) => {
    pathwayService
      .deleteById(id)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    for (let procedureId of pathway.procedures) {
      procedureService
        .deleteById(procedureId)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    }

    navigate("/manager-pathway");
  };

  const handleEditProcedure = (procedureId: string) => {
    setProcedureToEditId(procedureId);
    setShowEditProcedureModal(true);
  };

  const handleDeleteProcedure = (procedureId: string) => {
    setProcedureToDeleteId(procedureId);
    setShowDeleteProcedureModal(true);
  };

  const addProcedureToPathway = (newProcedureId: string) => {
    const updatedProcedures = [...pathway.procedures, newProcedureId];
    const updatedPathway = { ...pathway, procedures: updatedProcedures };
    setPathway(updatedPathway);
  };

  const removeProcedureFromPathway = (deletedProcedureId: string) => {
    const updatedProcedures = pathway.procedures.filter(
      (id) => id !== deletedProcedureId
    );
    const updatedPathway = { ...pathway, procedures: updatedProcedures };
    setPathway(updatedPathway);
  };

  type ProcedureStatus = "ongoing" | "completed" | "waiting" | "canceled" | "unpublished";

  const updateProceduresStatus = async (procedureIds: string[], status: ProcedureStatus) => {
    const fetchAndUpdatePromises = procedureIds.map(async (id) => {
      try {
        const { data: procedure } = await procedureService.getById<Procedure>(id.toString());
        return procedureService.updateById<Procedure>(id.toString(), { ...procedure, status });
      } catch (error) {
        console.error(`Error fetching or updating procedure with ID ${id}:`, error);
        throw error; // Rethrow to handle in Promise.allSettled or Promise.all
      }
    });
    return Promise.allSettled(fetchAndUpdatePromises);
  };


  const publishPathway = () => {
    const procedureUpdates = updateProceduresStatus(pathway.procedures, "waiting");

    procedureUpdates.then(() => {
      // Optionally check results for any rejected promises or failures
      const updatedPathway: Pathway = {
        ...pathway,
        status: "waiting"
      };
  
      pathwayService.updateById<Pathway>(pathway._id as string, updatedPathway)
        .then(({data}) => {
          setPathway(data);
          // console.log("Pathway and procedures updated to 'waiting'");
        })
        .catch(err => console.error("Error updating pathway:", err));
    })
    .catch(err => console.error("Error updating procedures:", err));
      
  };
    

  const endPathway = () => {
    const updatedPathway: Pathway = {
      ...pathway,
      status: "completed",
    }

    pathwayService.updateById<Pathway>(pathway._id as string, updatedPathway).then(({data}) => {
      setPathway(data)
    }).catch(err => console.log(err))
  }

  return (
    <Container id="app">
      <Box sx={{ flexGrow: 1, mt: 8 }}>
        <AppBanner cred={true} />
        <ManagerSideBar />
        <ProcedureBanner pathway={pathway} />
        <ProcedureList
          pathway={pathway}
          inEdit={inEdit}
          handleDeleteProcedure={handleDeleteProcedure}
          handleEditProcedure={handleEditProcedure}
          refetchToggle={refetchToggle}
        />
        <ProcedureButtons
          inEdit={inEdit}
          pathway={pathway}
          handleEditClick={() => setInEdit(true)}
          handleSaveClick={() => setInEdit(false)}
          handleAddProcedure={() => setShowAddProcedureModal(true)}
          handleDeletePathway={() => setShowDeletePathwayModal(true)}
          handlePublishPathway={publishPathway}
          handleEndPathway={endPathway}
        />
        <EditProcedureModal
          modalOpen={showEditProcedureModal}
          procedureToEditId={procedureToEditId}
          handleClose={() => setShowEditProcedureModal(false)}
          pathway={pathway}
          refetchProcedures={toggleRefetch}
        />
        {showDeleteProcedureModal && (
          <DeleteProcedureModal
            handleCloseModal={() => setShowDeleteProcedureModal(false)}
            pathway={pathway}
            procedureToDeleteId={procedureToDeleteId}
            removeProcedureFromPathway={removeProcedureFromPathway}
          />
        )}
        {showAddProcedureModal && (
          <AddProcedureModal
            pathway={pathway}
            handleClose={() => setShowAddProcedureModal(false)}
            addProcedureToPathway={addProcedureToPathway}
          />
        )}
        {showDeletePathwayModal && (
          <DeletePathwayModal
            handleConfirm={handleDeletePathway}
            handleCancel={() => setShowDeletePathwayModal(false)}
            pathwayId={id as string}
          />
        )}
      </Box>
    </Container>
  );
}

export default ProcedureScreen;
