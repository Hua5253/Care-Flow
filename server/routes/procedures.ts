import { Router } from "express";
import PathwayController from "../controllers/pathway_controller";

const router = Router();

router.post("/procedure", PathwayController.createProcedure);