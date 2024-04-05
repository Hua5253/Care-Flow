import { createBrowserRouter } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import PathwayScreen from "./components/pathwaysTab/pathwayScreen";
import ProcedureScreen from "./components/pathwaysTab/procedureScreen";

const router = createBrowserRouter([
    {path: '/', element: <SplashScreen />},
    {path: '/manager-pathway', element: <PathwayScreen />},
    {path: '/manager-procedure', element: <ProcedureScreen />}
])

export default router;