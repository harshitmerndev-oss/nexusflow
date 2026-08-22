export const executeAction = async (action, telemetryData) => {
  try {
    if (!action) {
      return {
        success: false,
        message: "No action provided",
      };
    }

    switch (action) {
      case "Send Alert":
        console.log(
          "🚨 ALERT: Temperature threshold exceeded",
          telemetryData
        );

        return {
          success: true,
          action: "Send Alert",
          message: "Alert sent successfully",
        };

      default:
        console.log("Unknown action:", action);

        return {
          success: false,
          action,
          message: "Unknown action",
        };
    }
  } catch (error) {
    throw new Error(`Action execution failed: ${error.message}`);
  }
};