import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import telemetryRoutes from "./routes/telemetry.route.js";
import workflowRoutes from "./routes/workflow.routes.js";
import ruleRoutes from "./routes/rule.routes.js";

dotenv.config();
connectDB();

const app = express();


app.use(cors());
app.use(express.json());
app.use("/api/rules", ruleRoutes);
app.use("/api/telemetry", telemetryRoutes);
app.use("/api/workflows", workflowRoutes);
app.get("/", (req, res) => {
  res.send("NexusFlow Backend is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});