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
import procedureService from "../../../services/procedure-service";
import EditProcedureModal from "../modals/EditProcedureModal";

function ProcedureScreen() {
  const [inEdit, setInEdit] = useState(false);
  const [showDeleteProcedureModal, setShowDeleteProcedureModal] =
    useState(false);
  const [showAddProcedureModal, setShowAddProcedureModal] = useState(false);
  const [showDeletePathwayModal, setShowDeletePathwayModal] = useState(false);
  const [showEditProcedureModal, setShowEditProcedureModal] = useState(false);
  const [procedureToEditId, setProcedureToEditId] = useState("");

  const { id } = useParams();

  const [pathway, setPathway] = useState<Pathway>({} as Pathway);
  const navigate = useNavigate();

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
    // console.log(procedureId);
    setProcedureToEditId(procedureId);
    setShowEditProcedureModal(true);
  };

  return (
    <Container id="app">
      <Box sx={{ flexGrow: 1, mt: 8 }}>
        <AppBanner cred={true} />
        <ManagerSideBar />
        <ProcedureBanner pathway={pathway} />
        <ProcedureList
          pathway={pathway}
          inEdit={inEdit}
          handleDeleteProcedure={() => setShowDeleteProcedureModal(true)}
          handleEditProcedure={handleEditProcedure}
        />
        <ProcedureButtons
          inEdit={inEdit}
          handleEditClick={() => setInEdit(true)}
          handleSaveClick={() => setInEdit(false)}
          handleAddProcedure={() => setShowAddProcedureModal(true)}
          handleDeletePathway={() => setShowDeletePathwayModal(true)}
        />
        <EditProcedureModal
          modalOpen={showEditProcedureModal}
          procedureToEditId={procedureToEditId}
          handleClose={() => setShowEditProcedureModal(false)}
          pathway={pathway}
        />
        {showDeleteProcedureModal && (
          <DeleteProcedureModal
            handleConfirm={() => setShowDeleteProcedureModal(false)}
            handleCancel={() => setShowDeleteProcedureModal(false)}
          />
        )}
        {showAddProcedureModal && (
          <AddProcedureModal
            pathway={pathway}
            handleClose={() => setShowAddProcedureModal(false)}
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
