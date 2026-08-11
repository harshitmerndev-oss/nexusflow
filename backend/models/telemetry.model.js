import mongoose from "mongoose";

const telemetrySchema = new mongoose.Schema(
  {
    deviceId: {
      type: String,
      required: true,
      index: true,
    },

    timestamp: {
      type: Date,
      required: true,
      default: Date.now,
    },

    metrics: {
      type: Map,
      of: Number,
      required: true,
    },
  },
  {
timeseries: {
      timeField: "timestamp",
      metaField: "deviceId",
      granularity: "seconds",
    },
  }
);

const Telemetry = mongoose.model("Telemetry", telemetrySchema);

export default Telemetry;