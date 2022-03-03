import express from "express";
import {
  deleteCategory,
  updateCategory,
  createCategory,
  getAllCategory,
  getCategory,
} from "./../controllers/categoryController";


const router = express.Router();

// Protect all routes after this middleware

router.route("/").get(getAllCategory).post(createCategory);
router
  .route("/:id")
  .get(getCategory)
  .delete(deleteCategory)
  .patch(updateCategory);


export default router;
