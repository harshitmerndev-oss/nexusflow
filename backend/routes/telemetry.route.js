import express from "express";
import { createTelemetry , getTelemetry} from "../controllers/telemetry.controller.js";

const router = express.Router();

router.post("/", createTelemetry);
router.get("/", getTelemetry);

export default router;