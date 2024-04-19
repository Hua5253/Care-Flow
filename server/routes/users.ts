import { Router } from "express";
import UserController from "../controllers/user_controller";

const router = Router();

router.get("/", UserController.getUsers);
router.post("/", UserController.createUser);
router.put("/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);
router.get("/:id", UserController.getUserById);
router.put("/users/chatroom/:id", UserController.updateChatroom);
router.get("/users/chatroom/:id", UserController.getMessages);
router.post("/users/chatroom", UserController.createChatroom);
router.put("/users/notifications/:id", UserController.updateNotifications);

export default router;
