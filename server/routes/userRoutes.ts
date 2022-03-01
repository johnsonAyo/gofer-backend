import express, { NextFunction, Request, Response } from "express";

import { signup, login, logout } from "./../controllers/authController";
import {
  getProfile,
  getUserProfile,
  getAllUser,
} from "./../controllers/userController";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", getProfile);
router.get("/", getAllUser);
router.get("/logout", logout);
router.get("/:userId", getUserProfile);

export default router;
