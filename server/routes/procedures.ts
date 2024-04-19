import { Router } from "express";
import procedure_controller from "../controllers/procedure_controller";

const router = Router();

router.post("/", procedure_controller.createProcedure);
router.get("/", procedure_controller.getProcedures);

export default router;
