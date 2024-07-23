import express from "express";
import { getMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/get-message", getMessage);

export default router;
