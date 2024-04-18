import { Router } from "express";
import PathwayController from "../controllers/pathway_controller";

const router = Router();

router.get("/", PathwayController.getNotTemplatePathways);
router.post("/", PathwayController.createBlankPathway);
router.put("/:id", PathwayController.updatePathway);
router.delete("/:id", PathwayController.deletePathway);

export default router;
