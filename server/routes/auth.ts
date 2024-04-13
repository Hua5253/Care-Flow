import express from "express";
const router = express.Router();
import AuthController from "../controllers/auth-controller";

router.post("/login", AuthController.loginUser);
router.post("/logout", AuthController.logoutUser);
export default router;
