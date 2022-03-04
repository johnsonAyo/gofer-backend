import Errand from "../models/ErrandModel";
import catchAsync from "./../utils/catchAsync";
import ErrorHandler from "./../utils/appError";
import express, { NextFunction, Request, Response } from "express";
import { CustomReq } from "../models/custom";
import cloudinaryImage from "./../utils/cloudinaryImageStorage";
import imageMulter from './../utils/multerImageUpload';
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
    const fullBody = { ...req.body, user: req.user?._id };
    console.log(fullBody);

    if (req.file == undefined) {
      let createErrand = await Errand.create({
        ...fullBody,
        tweetImage: null,
        cloudinary_id: null,
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
        ...fullBody,
        tweetImage: cloudImage.secure_url,
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
