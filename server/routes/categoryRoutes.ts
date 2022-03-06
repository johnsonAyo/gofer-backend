import express from "express";
import iconMulter from "./../utils/multerImageUpload";
import {
  deleteCategory,
  updateCategory,
  createCategory,
  getAllCategory,
  getCategory,
} from "./../controllers/categoryController";

const router = express.Router();

// Protect all routes after this middleware

router
  .route("/")
  .get(getAllCategory)
  .post(iconMulter.single("icon"), createCategory);
router
  .route("/:id")
  .get(getCategory)
  .delete(deleteCategory)
  .patch(updateCategory);

export default router;
