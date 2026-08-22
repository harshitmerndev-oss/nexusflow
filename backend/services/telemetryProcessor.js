import { telemetryStream$ } from "./telemetryStream.js";
import Workflow from "../models/workflow.model.js";
import { compileWorkflow } from "./workflowCompiler.js";
import { executeWorkflowRules } from "./ruleExecution.js";
import { executeAction } from "./actionExecutior.js";

telemetryStream$.subscribe(async (metrics) => {
  try {
    console.log("Live telemetry received:", metrics);

    // Get latest workflow
    const workflow = await Workflow.findOne().sort({
      createdAt: -1,
    });

    if (!workflow) {
      console.log("No workflow found");
      return;
    }

    // Compile workflow
    const compiledSteps = compileWorkflow(workflow);

    console.log("Compiled workflow:", compiledSteps);

    // Execute workflow rules
    const ruleResults = await executeWorkflowRules(
      compiledSteps,
      metrics
    );

    console.log("Workflow rule results:", ruleResults);

    // Execute actions for matched rules
    for (const result of ruleResults) {
      if (!result.matched || !result.action) {
        continue;
      }

      const actionResult = await executeAction(
        result.action,
        metrics
      );

      console.log("Action result:", actionResult);
    }
  } catch (error) {
    console.error(
      "Workflow execution failed:",
      error.message
    );
  }
});