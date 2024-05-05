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
import TemplatePathwayScreen from "./components/pathwaysTab/templatePathwayScreen";
import TemplateProcedureScreen from "./components/pathwaysTab/templateProcedureScreen";
import AuthWrapper from "./auth/requireAuth";

const router = createBrowserRouter([
  { path: "/", element: <SplashScreen /> },
  { path: "/login", element: <LoginScreen /> },
  { path: "/forgetPassword", element: <ForgetPasswordScreen /> },

  // manager routes
  { path: "/manager-pathway", element: <AuthWrapper allowedRoles={['manager']}><PathwayScreen /></AuthWrapper> },
  { path: "/manager-pathway/:id", element: <AuthWrapper allowedRoles={['manager']}> <ProcedureScreen /></AuthWrapper> },
  { path: "/manager-template", element: <AuthWrapper allowedRoles={['manager']}><TemplatePathwayScreen /></AuthWrapper> },
  { path: "/manager-template/:id", element: <AuthWrapper allowedRoles={['manager']}><TemplateProcedureScreen /></AuthWrapper> },
  { path: "/resources", element: <AuthWrapper allowedRoles={['manager']}><ResourceScreen /></AuthWrapper> },
  { path: "/messages/manager", element: <AuthWrapper allowedRoles={['manager']}><MessagesTab /></AuthWrapper> },

  // admin routes
  { path: "/accounts", element: <AuthWrapper allowedRoles={['admin']}><AccountsScreen /></AuthWrapper> },
  { path: "/messages/admin", element: <AuthWrapper allowedRoles={['admin']}><MessagesTab /> </AuthWrapper>},

  // caregiver routes
  { path: "/messages/caregiver", element: <AuthWrapper allowedRoles={['caregiver']}><MessagesTab /></AuthWrapper> },
  { path: "/schedule", element: <AuthWrapper allowedRoles={['caregiver']}><CaregiverScreen /></AuthWrapper> },
  { path: "/schedule/:id", element: <AuthWrapper allowedRoles={['caregiver']}><ViewProcedureScreen /></AuthWrapper> },
]);

export default router;
