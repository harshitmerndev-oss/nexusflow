import Rule from "../models/rule.model.js";
import { evaluateRule } from "./ruleEngine.js";

export const executeRules = async (telemetryData) => {
  const rules = await Rule.find();

  const results = rules.map((rule) => {
    const matched = evaluateRule(rule, telemetryData);

    return {
      ruleId: rule._id,
      ruleName: rule.name,
      matched,
      action: matched ? rule.action : null,
    };
  });

  return results;
};

export const executeWorkflowRules = async (
  compiledSteps,
  telemetryData
) => {
  const results = [];

  for (const step of compiledSteps) {
    if (step.type !== "rule") {
      continue;
    }

    const ruleId = step.data?.ruleId;

    if (!ruleId) {
      continue;
    }

    const rule = await Rule.findById(ruleId);

    if (!rule) {
      continue;
    }

    const matched = evaluateRule(rule, telemetryData);

    results.push({
      ruleId: rule._id,
      ruleName: rule.name,
      matched,
      action: matched ? rule.action : null,
    });
  }

  return results;
};