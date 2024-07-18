import express from "express";
import {
  acceptRequest,
  getRequests,
  getUsers,
  sendRequest,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/get-users/:userId", getUsers);
router.post("/send-request", sendRequest);
router.get("/get-request/:userId", getRequests);
router.post("/accept-request", acceptRequest);

export default router;
