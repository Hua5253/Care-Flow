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
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        //ml: { xs: "20vw", sm: "12vw", md: "15vw", lg: "20vw", xl: "20vw" },
        // mt: "50px",
        height: "100vh",
      }}
    >
      <AppBanner cred={true} />
      <ManagerSideBar />
      <Box
        component="main"
        sx={{
          mt: "75px",
          ml: { sm: "100px", md: "120px" },
          pl: { sm: "50px", md: "40px" },
          backgroundColor: "#f5f5f5",
          width: "80%",
          height: "90%",
          pr: 9,
          pt: 2,
          pb: 2,
          overflow: "scroll",
        }}
      >
        <PathwayList
          showModal={handleAddPathwayModalClick}
          pathways={pathways}
          handleEditPathway={handleEditPathwayButtonClick}
        />
      </Box>
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
    </Container>
  );
}
