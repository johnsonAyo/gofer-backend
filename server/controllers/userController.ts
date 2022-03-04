import express, { NextFunction, Request, Response } from "express";
import User from "../models/UserModel";
import catchAsync from "../utils/catchAsync";
import ErrorHandler from "../utils/appError";
import { CustomReq } from "../models/custom";
import { getAll } from "./handlerFactory";
import cloudinaryImage from "../utils/cloudinaryImageStorage";
import imageMulter from "../utils/multerImageUpload";
import multer from "multer";
const upload = imageMulter.single("profileImage");

export const getAllUser = getAll(User);

export const getUserProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({ _id: req.params.userId });
    return res.status(200).json({
      user,
    });
  }
);

export const getProfile = catchAsync(
  async (req: CustomReq, res: Response, next: NextFunction) => {
    const user = await User.findOne({ _id: req.user._id });
    console.log();
    if (!user) return next(ErrorHandler(404, "User does not exist", {}));
    return res.status(200).json({
      user,
    });
  }
);

export const updateProfile = catchAsync(
  async (req: CustomReq, res: Response, next: NextFunction) => {
    const profile = await User.findOne({ _id: req.user._id });
    if (!profile) return next(ErrorHandler(404, "profile does not exist", {}));
    await profile.updateOne({
      firstName: req.body.firstName || profile.firstName,
      lastName: req.body.lastName || profile.lastName,
      email: req.body.email || profile.email,
      phoneNumber: req.body.phoneNumber || profile.phoneNumber,
    });
    const updateProfile = await User.findOne({ _id: req.user._id });
    return res.status(201).json({
      status: "successful!",
      profile: updateProfile,
    });
  }
);

export const updateProfileImage = catchAsync(
  async (req: CustomReq, res: Response, next: NextFunction) => {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return next(ErrorHandler(500, err.message, {}));
      } else if (err) {
        return next(ErrorHandler(500, err.message, {}));
      }

      const path = req.file?.path;
      try {
        const profile = await User.findOne({ email: req.user.email });
        if (!profile)
          return next(ErrorHandler(500, "Profile does not exist", {}));
        const file = await cloudinaryImage.uploader.upload(path as string);
        await profile.updateOne({ profileImage: file.url });
        const updateProfile = await User.findOne({ _id: req.user._id });
        return res.status(201).json({
          status: "successful!",
          profile: updateProfile,
        });
      } catch (error) {
        next(ErrorHandler(500, "An error Occured", {}));
      }
    });
  }
);
