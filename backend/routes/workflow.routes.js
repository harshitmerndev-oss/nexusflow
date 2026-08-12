import express from "express";
import {
  createWorkflow,
  getWorkflows,
} from "../controllers/workflow.controller.js";

const router = express.Router();

router.post("/", createWorkflow);
router.get("/", getWorkflows);

export default router;