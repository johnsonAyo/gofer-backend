import Category from "../models/CategoryModel";
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from "./handlerFactory";

const updateCategory = updateOne(Category);
const deleteCategory = deleteOne(Category);
const getAllCategory = getAll(Category);
const getCategory = getOne(Category, "");
const createCategory = createOne(Category);

export {
    deleteCategory,
    updateCategory,
    createCategory,
    getAllCategory,
    getCategory,
};

