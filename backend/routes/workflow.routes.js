import express from "express";

import {
  createWorkflow,
  getWorkflows,
  compileWorkflowById,
} from "../controllers/workflow.controller.js";

const router = express.Router();

router.post("/", createWorkflow);

router.get("/", getWorkflows);

router.post("/:id/compile", compileWorkflowById);

export default router;