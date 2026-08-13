import express from "express";
import {
  createWorkflow,
  getWorkflows,
  compileWorkflowById
} from "../controllers/workflow.controller.js";

const router = express.Router();

router.post("/", createWorkflow);
router.post("/:id/compile", compileWorkflowById);
router.get("/", getWorkflows);

export default router;