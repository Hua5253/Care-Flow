import Box from "@mui/material/Box";
import PathwayList from "./PathwayList";
import CreatePathwayModal from "../modals/CreatePathwayModal";
import { useEffect, useState } from "react";
import AppBanner from "../../AppBanner/AppBanner";
import { Container } from "@mui/material";
import ManagerSideBar from "../../SideBar/ManagerSideBar";
import BlankPathwayFormModal from "../modals/BlankPathwayFormModal";
import pathwayService, { Pathway } from "../../../services/pathway-service";
import EditPathwayModal from "../modals/EditPathwayModal";

export default function PathwayScreen() {
  const [showAddPathwayModal, setShowAddPathwayModal] = useState(false);
  const [showBlankPathwayFormModal, setShowBlankPathwayFormModal] =
    useState(false);

  const [showEditPathwayModal, setShowEditPathwayModal] = useState(false);

  const [pathways, setPathways] = useState<Pathway[]>([]);

  const [pathwayToEdit, setPathwayToEdit] = useState<Pathway>({} as Pathway);

  useEffect(() => {
    pathwayService
      .getAll<Pathway>()
      .then((res) => {
        setPathways(res.data);
      })
      .catch((err) => console.log(err));
  }, [pathwayToEdit]);

  const handleAddPathwayModalClick = () => {
    setShowAddPathwayModal(true);
  };

  const handleEditPathwayButtonClick = (pathwayId: string) => {
    setShowEditPathwayModal(true);
    pathwayService.getById<Pathway>(pathwayId).then(({ data: pathway }) => {
      setPathwayToEdit(pathway);
    });
  };

  const handleEditPathway = (pathwayName: string, patient: string) => {
    const updatedPathway: Pathway = {
      ...pathwayToEdit,
      name: pathwayName,
      patient: patient,
    };

    pathwayService
      .updateById<Pathway>(pathwayToEdit._id as string, updatedPathway)
      .then(() => {
        const updatedPathways = pathways.map((p) =>
          p._id === pathwayToEdit._id
            ? { ...p, name: pathwayName, patient: patient }
            : p
        );
        setPathways(updatedPathways);
        setShowEditPathwayModal(false);
      });
  };

  return (
    <Container sx={{ display: "flex" }}>
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
        <AppBanner cred={true} />
        <ManagerSideBar />
        <PathwayList
          showModal={handleAddPathwayModalClick}
          pathways={pathways}
          handleEditPathway={handleEditPathwayButtonClick}
        />
        {showAddPathwayModal && (
          <CreatePathwayModal
            handleClose={() => setShowAddPathwayModal(false)}
            createBlankPathway={() => setShowBlankPathwayFormModal(true)}
          />
        )}
        <BlankPathwayFormModal
          open={showBlankPathwayFormModal}
          handleClose={() => setShowBlankPathwayFormModal(false)}
        />
        <EditPathwayModal
          pathway={pathwayToEdit}
          showModal={showEditPathwayModal}
          handleClose={() => setShowEditPathwayModal(false)}
          handleEditPathway={handleEditPathway}
        />
      </Box>
    </Container>
  );
}
