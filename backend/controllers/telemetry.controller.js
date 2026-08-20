import Telemetry from "../models/telemetry.model.js";
import { executeRules } from "../services/ruleExecution.js";

export const createTelemetry = async (req, res) => {
  try {
    const { deviceId, timestamp, metrics } = req.body;

    if (!deviceId || !metrics) {
      return res.status(400).json({
        success: false,
        message: "deviceId and metrics are required",
      });
    }

    const telemetry = await Telemetry.create({
      deviceId,
      timestamp,
      metrics,
    });
    const ruleResults = await executeRules(metrics);

  return res.status(201).json({
  success: true,
  message: "Telemetry data created successfully",
  data: telemetry,
  ruleResults,
});
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create telemetry",
      error: error.message,
    });
  }
};
export const getTelemetry = async (req, res) => {
  try {
    const telemetry = await Telemetry.find().sort({ timestamp: -1 });

    return res.status(200).json({
      success: true,
      data: telemetry
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch telemetry",
      error: error.message
    });
  }
};