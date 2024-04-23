import e, { Router } from "express";
import ResourceController from "../controllers/resource_controller";

const router = Router();

router.get("/room", ResourceController.getRooms);
router.post("/resource/room", ResourceController.createRoom);
router.put("/resource/room/:id", ResourceController.updateRoom);
router.delete("/resource/room/:id", ResourceController.deleteRoom);

router.get("/equipment", ResourceController.getEquipments);
router.post("/equipment", ResourceController.createEquipment);
router.put("/resource/equipment/:id", ResourceController.updateEquipment);
router.delete("/resource/equipment/:id", ResourceController.deleteEquipment);

router.get("/medicine", ResourceController.getMedicines);
router.post("/resource/Medicine", ResourceController.createMedicine);
router.put("/resource/Medicine/:id", ResourceController.updateMedicine);
router.delete("/resource/Medicine/:id", ResourceController.deleteMedicine);

export default router;
