import express from "express";
import imageMulter from "./../utils/multerImageUpload";
import {
  deleteErrand,
  updateErrand,
  createErrand,
  getAllErrand,
  getErrand,
  getAllUserErrand,
} from "./../controllers/errandController";

import { protect } from "./../controllers/authController";

const router = express.Router();

// Protect all routes after this middleware
router.use(protect);
router.route("/user").get(getAllUserErrand);
router
  .route("/user/:id")
  .get(getErrand)
  .delete(deleteErrand)
  .patch(updateErrand);

router
  .route("/")
  .get(getAllErrand)
  .post(imageMulter.single("errandImage"), createErrand);

router.route("/:id").get(getErrand).patch(updateErrand).delete(deleteErrand);

export default router;
