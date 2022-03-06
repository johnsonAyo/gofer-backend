import Category from "../models/CategoryModel";
import catchAsync from "./../utils/catchAsync";
import { NextFunction, Response } from "express";
import { CustomReq } from "../models/custom";

import { getAll, getOne, updateOne, deleteOne } from "./handlerFactory";
import cloudinaryImage from "../utils/cloudinaryImageStorage";

const updateCategory = updateOne(Category);
const deleteCategory = deleteOne(Category);
const getAllCategory = getAll(Category);
const getCategory = getOne(Category, "");

const createCategory = catchAsync(
  async (req: CustomReq, res: Response, next: NextFunction) => {
    const { name } = req.body;

    let cloudImage = await cloudinaryImage.uploader.upload(req.file.path);
    let createCategory = await Category.create({
      name,
      icon: cloudImage.secure_url,
      cloudinary_id: cloudImage.public_id,
    });
    res.status(201).json({
      status: "success",
      data: {
        data: createCategory,
      },
    });
  }
);

export {
  deleteCategory,
  updateCategory,
  createCategory,
  getAllCategory,
  getCategory,
};
