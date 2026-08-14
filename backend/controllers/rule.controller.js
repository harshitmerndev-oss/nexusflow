import Rule from "../models/rule.model.js";

// Create Rule
export const createRule = async (req, res) => {
  try {
    const { name, condition, action } = req.body;

    const rule = await Rule.create({
      name,
      condition,
      action,
    });

    return res.status(201).json({
      success: true,
      message: "Rule created successfully",
      data: rule,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create rule",
      error: error.message,
    });
  }
};

// Get All Rules
export const getRules = async (req, res) => {
  try {
    const rules = await Rule.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      data: rules,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch rules",
      error: error.message,
    });
  }
};