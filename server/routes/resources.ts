import { Router } from 'express';
import ResourceController from '../controllers/resource_controller'

const router = Router();

router.post('/resource/room', ResourceController.createRoom);
router.put('/resource/room/:id', ResourceController.updateRoom);
router.delete('/resource/room/:id', ResourceController.deleteRoom);
router.post('/resource/equipment', ResourceController.createEquipment);
router.put('/resource/equipment/:id', ResourceController.updateEquipment);
router.delete('/resource/equipment/:id', ResourceController.deleteEquipment);
router.post('/resource/Medicine', ResourceController.createMedicine);
router.put('/resource/Medicine/:id', ResourceController.updateMedicine);
router.delete('/resource/Medicine/:id', ResourceController.deleteMedicine);