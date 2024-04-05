import { Box } from "@mui/material";
import ProcedureBanner from "./ProcedureBanner";
import ProcedureList from "./ProcedureList";
import ProcedureFooterButtons from "./ProcedureFooterButtons";

function ProcedureScreen() {
    return <Box sx={{ flexGrow: 1, mt: 8 }}>
        <ProcedureBanner />
        <ProcedureList />
        <ProcedureFooterButtons />
    </Box>
}

export default ProcedureScreen;