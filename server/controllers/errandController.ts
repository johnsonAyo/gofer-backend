import Errand from "../models/ErrandModel";
import catchAsync from "./../utils/catchAsync";
import { NextFunction, Response } from "express";
import { CustomReq } from "../models/custom";
import cloudinaryImage from "./../utils/cloudinaryImageStorage";
import imageMulter from "../utils/multerImageUpload";
import multer from "multer";
import ErrorHandler from "../utils/appError";
const upload = imageMulter.single("profileImage");
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



export const updateErrandImage = catchAsync(
  async (req: CustomReq, res: Response, next: NextFunction) => {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return next(ErrorHandler(500, err.message, {}));
      } else if (err) {
        return next(ErrorHandler(500, err.message, {}));
      }

      const path = req.file?.path;
      try {
        const errand = await Errand.findOne({ _id: req.params.errandId });
        console.log(errand)
        if (!errand)
          return next(ErrorHandler(500, "Errand does not exist", {}));
        const file = await cloudinaryImage.uploader.upload(path as string);
        await errand.updateOne({ errandImage: file.url });
        const updatedErrand = await Errand.findOne({
          _id: req.params.errandId,
        });
        return res.status(201).json({
          status: "successful!",
          errand: updatedErrand,
        });
      } catch (error) {
        next(ErrorHandler(500, "An error Occured", {}));
      }
    });
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
