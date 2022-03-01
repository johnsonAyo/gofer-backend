import express, { NextFunction, Request, Response } from "express";

import { signup, login, logout,getAllUser, getUserProfile , getProfile, protect} from "./../controllers/authController";


const router = express.Router();

router.post("/signup",  signup);
router.post("/login", login);
router.get("/profile", protect, getProfile);
router.get("/", protect, getAllUser);
router.get("/logout", logout);
router.get("/:userId", protect, getUserProfile);
// router.patch("/", updateProfile);

export default router;
