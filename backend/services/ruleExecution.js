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