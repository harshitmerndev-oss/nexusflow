import { telemetryStream$ } from "./telemetryStream.js";
import { executeRules } from "./ruleExecution.js";

telemetryStream$.subscribe(async (metrics) => {
  try {
    console.log("Live telemetry received:", metrics);

    const ruleResults = await executeRules(metrics);

    console.log("Rule results:", ruleResults);
  } catch (error) {
    console.error("Rule execution failed:", error.message);
  }
});