import Box from "@mui/material/Box";
import PathwayList from "./PathwayList";
import CreatePathwayModal from "../modals/CreatePathwayModal";
import { useState } from "react";
import AppBanner from "../../AppBanner/AppBanner";
import { Container } from "@mui/material";
import ManagerSideBar from "../../SideBar/ManagerSideBar";
import BlankPathwayFormModal from "../modals/BlankPathwayFormModal";

export default function PathwayScreen() {
    const [showAddPathwayModal, setShowAddPathwayModal] = useState(false);
    const [showBlankPathwayFormModal, setShowBlankPathwayFormModal] =
        useState(false);

    const handleAddPathwayModalClick = () => {
        setShowAddPathwayModal(true);
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
                <PathwayList showModal={handleAddPathwayModalClick} />
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
            </Box>
        </Container>
    );
}
