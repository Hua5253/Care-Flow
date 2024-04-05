import { createBrowserRouter } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import PathwayScreen from "./components/pathwaysTab/pathwayScreen";
import ProcedureScreen from "./components/pathwaysTab/procedureScreen";
import ResourcesScreen from "./components/ResourcesTab/Screen";

const router = createBrowserRouter([
    {path: '/', element: <SplashScreen />},
    {path: '/manager-pathway', element: <PathwayScreen />},
    {path: '/manager-procedure', element: <ProcedureScreen />},
    {path: '/resources', element: <ResourcesScreen />},
])

export default router;