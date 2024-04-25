import { Router } from "express";
import procedure_controller from "../controllers/procedure_controller";

const router = Router();

router.post("/", procedure_controller.createProcedure);
router.get("/", procedure_controller.getProcedures);
router.get("/:id", procedure_controller.getProceduresById);
router.delete("/:id", procedure_controller.deleteProcedure);
router.put("/:id", procedure_controller.updateProcedure);

export default router;
