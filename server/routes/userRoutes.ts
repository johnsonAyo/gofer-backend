import express, { NextFunction, Request, Response } from "express";


import {getUserProfile, getAllUser,getProfile, updateProfile} from "./../controllers/userController"
import {protect} from "./../controllers/authController"

const router = express.Router();


router.get("/", protect, getAllUser);
router.patch("/", protect, updateProfile);
router.get("/profile", protect, getProfile);
router.get("/:userId", protect, getUserProfile);


export default router;
