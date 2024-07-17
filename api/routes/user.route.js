import express from "express";
import { getUsers, sendRequest } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/get-users/:userId", getUsers);
router.post("/send-request", sendRequest);

export default router;
