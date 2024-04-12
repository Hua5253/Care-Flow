import { Router } from 'express';
import PathwayController from '../controllers/pathway_controller'

const router = Router();

router.post('/pathway', PathwayController.createPathway);
router.put('/pathway/:id', PathwayController.updatePathway);
router.delete('/pathway/:id', PathwayController.deletePathway);
router.post('/pathway/equipment', PathwayController.createProcedure);
