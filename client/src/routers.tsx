import { createBrowserRouter } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import PathwayScreen from "./components/pathwaysTab/pathwayScreen";
import ProcedureScreen from "./components/pathwaysTab/procedureScreen";
import AccountsScreen from "./components/AccountsTab/AccountsScreen";
import MessagesTab from "./components/MessagesTab";
import LoginScreen from "./components/LoginScreen";
import ForgetPasswordScreen from "./components/ForgetPasswordScreen";
import CaregiverScreen from "./components/CareGivers/CaregiverScreen";
import ViewProcedureScreen from "./components/CareGivers/ViewProcedureScreen";
import ResourceScreen from "./components/ResourcesTab";
import TemplateScreen from "./components/pathwaysTab/templateScreen/TemplateScreen";

const router = createBrowserRouter([
    { path: "/", element: <SplashScreen /> },
    { path: "/manager-pathway", element: <PathwayScreen /> },
    { path: "/manager-procedure", element: <ProcedureScreen /> },
    { path: "/pathways/:id", element: <ProcedureScreen /> },
    { path: "/manager-template", element: <TemplateScreen /> },
    { path: "/resources", element: <ResourceScreen /> },
    { path: "/accounts", element: <AccountsScreen /> },
    { path: "/messages/admin", element: <MessagesTab /> },
    { path: "/messages/manager", element: <MessagesTab /> },
    { path: "/messages/caregiver", element: <MessagesTab /> },
    { path: "/login", element: <LoginScreen /> },
    { path: "/forgetPassword", element: <ForgetPasswordScreen /> },
    { path: "/schedule", element: <CaregiverScreen /> },
    { path: "/procedure/:id", element: <ViewProcedureScreen /> },
]);

export default router;
