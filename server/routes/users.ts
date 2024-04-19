import { Router } from "express";
import UserController from "../controllers/user_controller";

const router = Router();

router.get("/", UserController.getUsers);
router.get("/:id", UserController.getUserById);
router.post("/", UserController.createUser);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);
router.put("/chatroom/:id", UserController.updateChatroom);
router.get("/chatroom/:id", UserController.getMessages);
router.post("/chatroom", UserController.createChatroom);
router.put("/notifications/:id", UserController.updateNotifications);

export default router;
