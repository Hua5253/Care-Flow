import e, { Router } from "express";
import ResourceController from "../controllers/resource_controller";

const router = Router();

router.get("/room", ResourceController.getRooms);
router.post("/room", ResourceController.createRoom);
router.get("/room/:id", ResourceController.getRoomById);
router.put("/room/:id", ResourceController.updateRoom);
router.delete("/room/:id", ResourceController.deleteRoom);

router.get("/equipment", ResourceController.getEquipments);
router.post("/equipment", ResourceController.createEquipment);
router.get("/equipment/:id", ResourceController.getEquipmentById);
router.put("/equipment/:id", ResourceController.updateEquipment);
router.delete("/equipment/:id", ResourceController.deleteEquipment);

router.get("/medicine", ResourceController.getMedicines);
router.post("/medicine", ResourceController.createMedicine);
router.get("/medicine/:id", ResourceController.getMedicineById);
router.put("/medicine/:id", ResourceController.updateMedicine);
router.delete("/medicine/:id", ResourceController.deleteMedicine);

export default router;
