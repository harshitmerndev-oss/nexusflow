export const evaluateRule = (rule, telemetryData) => {
  try {
    const { condition } = rule;

    const { temperature } = telemetryData;

    if (condition === "temperature > 80") {
      return temperature > 80;
    }

    return false;
  } catch (error) {
    throw new Error("Failed to evaluate rule");
  }
};
