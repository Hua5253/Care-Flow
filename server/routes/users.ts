import { Router } from "express";
import UserController from "../controllers/user_controller";

const router = Router();

router.get("/notification", UserController.getNotifications);
router.post("/notification", UserController.createNotification);
router.put("/notification/status/read", UserController.updateNotificationsRead);
router.put("/notification/:id", UserController.updateNotification);
router.post("/chatroom", UserController.createChatroom);
router.put("/chatroom/:id", UserController.updateChatroom);
router.get("/chatroom/:id", UserController.getMessages);
router.get("/", UserController.getUsers);
router.get("/:id", UserController.getUserById);
router.post("/", UserController.createUser);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

export default router;
