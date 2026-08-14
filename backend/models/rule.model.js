import mongoose from "mongoose";

const ruleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    condition: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Rule = mongoose.model("Rule", ruleSchema);

export default Rule;