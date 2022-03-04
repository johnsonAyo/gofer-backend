import imageMulter from "./../utils/multerImageUpload";
import express from "express";
import { signup, login, logout } from "./../controllers/authController";

const router = express.Router();

router.post("/signup", imageMulter.single("profileImage"), signup);
router.post("/login", login);
router.get("/logout", logout);

export default router;
