import Workflow from "../models/workflow.model.js";
import { compileWorkflow } from "../services/workflowCompiler.js";

export const createWorkflow = async (req, res) => {
  try {
    const { name, nodes, edges } = req.body;

    if (!name || !nodes || !edges) {
      return res.status(400).json({
        success: false,
        message: "name, nodes and edges are required",
      });
    }

    const workflow = await Workflow.create({
      name,
      nodes,
      edges,
    });

    return res.status(201).json({
      success: true,
      message: "Workflow created successfully",
      data: workflow,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create workflow",
      error: error.message,
    });
  }
};

export const getWorkflows = async (req, res) => {
  try {
    const workflows = await Workflow.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: workflows,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch workflows",
      error: error.message,
    });
  }
};
export const compileWorkflowById = async (req, res) => {
  try {
    const workflow = await Workflow.findById(req.params.id);

    if (!workflow) {
      return res.status(404).json({
        success: false,
        message: "Workflow not found",
      });
    }

    const compiledData = compileWorkflow(workflow);

    return res.status(200).json({
      success: true,
      compiledData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};