import Errand from "../models/ErrandModel";
import catchAsync from "./../utils/catchAsync";
import { NextFunction, Response } from "express";
import { CustomReq } from "../models/custom";
import cloudinaryImage from "./../utils/cloudinaryImageStorage";
import {
  getAll,
  getOne,
  updateOne,
  deleteOne,
  getAllByUser,
} from "./handlerFactory";

const updateErrand = updateOne(Errand);
const deleteErrand = deleteOne(Errand);
const getAllErrand = getAll(Errand);
const getErrand = getOne(Errand, "");
const getAllUserErrand = getAllByUser(Errand);

const createErrand = catchAsync(
  async (req: CustomReq, res: Response, next: NextFunction) => {
    const {
      errandDetails,
      errandCost,
      deliveryAddress,
      categoryId,
      pickupAddress,
    } = req.body;

    if (req.file == undefined) {
      let createErrand = await Errand.create({
        user: req.user._id,
        errandDetails,
        errandCost,
        deliveryAddress,
        categoryId,
        pickupAddress,
        errandImage: null,
        cloudinary_id: null,
        errandDeadline: new Date(req.body.errandDeadline),
      });

      res.status(201).json({
        status: "success",
        data: {
          data: createErrand,
        },
      });
    } else {
      let cloudImage = await cloudinaryImage.uploader.upload(req.file.path);
      let createErrand = await Errand.create({
        user: req.user._id,
        errandDetails,
        errandCost,
        deliveryAddress,
        categoryId,
        pickupAddress,
        errandDeadline: new Date(req.body.errandDeadline),
        errandImage: cloudImage.secure_url,
        cloudinary_id: cloudImage.public_id,
      });
      res.status(201).json({
        status: "success",
        data: {
          data: createErrand,
        },
      });
    }
  }
);

export {
  deleteErrand,
  updateErrand,
  createErrand,
  getAllErrand,
  getErrand,
  getAllUserErrand,
};
