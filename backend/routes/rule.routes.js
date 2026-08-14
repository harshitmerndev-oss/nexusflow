import express from "express";

import {
  createRule,
  getRules,
} from "../controllers/rule.controller.js";

const router = express.Router();

router.post("/", createRule);

router.get("/", getRules);

export default router;