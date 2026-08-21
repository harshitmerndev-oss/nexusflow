export const evaluateRule = (rule, telemetryData) => {
  try {
    const { condition } = rule;

    const match = condition.match(
      /^(\w+)\s*(>=|<=|>|<|===|==|!==|!=)\s*(\d+(?:\.\d+)?)$/
    );

    if (!match) {
      throw new Error("Invalid rule condition");
    }

    const [, field, operator, value] = match;

    const telemetryValue = telemetryData[field];
    const ruleValue = Number(value);

    if (telemetryValue === undefined) {
      return false;
    }

    switch (operator) {
      case ">":
        return telemetryValue > ruleValue;

      case "<":
        return telemetryValue < ruleValue;

      case ">=":
        return telemetryValue >= ruleValue;

      case "<=":
        return telemetryValue <= ruleValue;

      case "==":
      case "===":
        return telemetryValue == ruleValue;

      case "!=":
      case "!==":
        return telemetryValue != ruleValue;

      default:
        return false;
    }
  } catch (error) {
    throw new Error("Failed to evaluate rule");
  }
};