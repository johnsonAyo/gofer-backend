import express from "express";


import {
  getUserProfile,
  getAllUser,
  getProfile,
  updateProfile,
} from "./../controllers/userController";
import { protect } from "./../controllers/authController";

const router = express.Router();

// Protect all routes after this middleware
router.use(protect);

router.get("/", getAllUser);
router.patch("/", updateProfile);
router.get("/profile", getProfile);
router.get("/:userId", getUserProfile);

export default router;
