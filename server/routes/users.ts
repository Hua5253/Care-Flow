import { Router } from "express";
import UserController from "../controllers/user_controller";

const router = Router();

router.get("/users", UserController.getUsers);
router.post("/users", UserController.createUser);
router.put("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);
router.get("/users/:id", UserController.getUserById);
router.put("/users/chatroom/:id", UserController.updateChatroom);
router.get("/users/chatroom/:id", UserController.getMessages);
router.post("/users/chatroom", UserController.createChatroom);
router.put("/users/notifications/:id", UserController.updateNotifications);

export default router;
