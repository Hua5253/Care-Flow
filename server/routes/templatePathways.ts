import { Router } from "express";
import PathwayController from "../controllers/pathway_controller";

const router = Router();

router.get("/", PathwayController.getTemplatePathways);
router.post("/", PathwayController.createTemplatePathway);
router.get("/:id", PathwayController.getPathwayById);
router.delete("/:id", PathwayController.deletePathway);

export default router;