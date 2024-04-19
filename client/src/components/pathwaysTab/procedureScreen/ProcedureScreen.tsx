import { Box, Container } from "@mui/material";
import ProcedureBanner from "./ProcedureBanner";
import ProcedureList from "./ProcedureList";
import AppBanner from "../../AppBanner/AppBanner";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import pathwayService, { Pathway } from "../../../services/pathway-service";
import DeleteProcedureModal from "../modals/DeleteProcedureModal";
import AddProcedureModal from "../modals/AddProcedureModal";
import ManagerSideBar from "../../SideBar/ManagerSideBar";
import ProcedureButtons from "./ProcedureButtons";
import DeletePathwayModal from "../modals/DeletePathwayModal";

function ProcedureScreen() {
  const [inEdit, setInEdit] = useState(false);
  const [showDeleteProcedureModal, setShowDeleteProcedureModal] =
    useState(false);
  const [showAddProcedureModal, setShowAddProcedureModal] = useState(false);
  const [showDeletePathwayModal, setShowDeletePathwayModal] = useState(false);

  const { id } = useParams();

  const [pathway, setPathway] = useState<Pathway>({} as Pathway);

  useEffect(() => {
    pathwayService
      .getById<Pathway>(id as string)
      .then(res => setPathway(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <Container id='app'>
      <Box sx={{ flexGrow: 1, mt: 8 }}>
        <AppBanner cred={true} />
        <ManagerSideBar />
        <ProcedureBanner pathway={pathway} />
        <ProcedureList
          pathway={pathway}
          inEdit={inEdit}
          handleDeleteProcedure={() => setShowDeleteProcedureModal(true)}
        />
        <ProcedureButtons
          inEdit={inEdit}
          handleEditClick={() => setInEdit(true)}
          handleSaveClick={() => setInEdit(false)}
          handleAddProcedure={() => setShowAddProcedureModal(true)}
          handleDeletePathway={() => setShowDeletePathwayModal(true)}
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
            handleConfirm={() => setShowDeletePathwayModal(false)}
            handleCancel={() => setShowDeletePathwayModal(false)}
          />
        )}
      </Box>
    </Container>
  );
}

export default ProcedureScreen;
