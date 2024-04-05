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

const router = createBrowserRouter([
  { path: "/", element: <SplashScreen /> },
  { path: "/manager-pathway", element: <PathwayScreen /> },
  { path: "/manager-procedure", element: <ProcedureScreen /> },
  { path: "/accounts", element: <AccountsScreen /> },
  { path: "/messages", element: <MessagesTab /> },
  { path: "/login", element: <LoginScreen /> },
  { path: "/forgetPassword", element: <ForgetPasswordScreen /> },
  { path: "/schedule", element: <CaregiverScreen /> },
  { path: "/procedure/:id", element: <ViewProcedureScreen /> },
]);

export default router;
