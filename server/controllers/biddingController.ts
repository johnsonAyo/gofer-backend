import express, { NextFunction, Request, Response } from "express";
import User from "../models/UserModel";
import Bidding from "../models/BiddingModel";
import Errand from "../models/ErrandModel";
import catchAsync from "../utils/catchAsync";
import ErrorHandler from "../utils/appError";
import { CustomReq } from "../models/custom";

import { getAll, getOne, deleteOne, getAllByUser } from "./handlerFactory";

const deleteBidding = deleteOne(Bidding);
const getAllBidding = getAll(Bidding);
const getBidding = getOne(Bidding, "");
const getAllUserBidding = getAllByUser(Bidding);

export const createBidding = catchAsync(
  async (req: CustomReq, res: Response, next: NextFunction) => {
    let isBidded = await Bidding.findOne({
      userId: req.user._id,
      errandId: req.params.errandId,
    });

    if (isBidded)
      return next(ErrorHandler(401, "You already Bid for this Errand", {}));

    const errand = await Errand.findById({ errandId: req.params.errandId });

    if (errand.user == req.user._id)
      return next(ErrorHandler(401, "You cannot bid for your Errand", {}));

    const newBid = await Bidding.create({
      errandId: req.params.errandId,
      userId: req.user._id,
    });

    res.status(201).json({
      status: "success",
      data: {
        data: newBid,
      },
    });
  }
);

export const getAllErrandBids = catchAsync(
  async (req: CustomReq, res: Response, next: NextFunction) => {
    let errandBids = await Bidding.find({
      errandId: req.params.errandId,
    });

    if (!errandBids)
      return next(ErrorHandler(401, "This errand has no bids", {}));
    res.status(201).json({
      status: "success",
      data: {
        data: errandBids,
      },
    });
  }
);

const acceptBidding = catchAsync(
  async (req: CustomReq, res: Response, next: NextFunction) => {
    const bidding = await Bidding.findById(req.params.id);

    if (!bidding) return next(ErrorHandler(404, "bidding does not exist", {}));

    const errand = await Errand.findById(bidding.errandId);

    if (!errand) return next(ErrorHandler(404, "errand does not exist", {}));

    console.log({ e: errand.user, a: req.user._id });

    if (errand.user + "" != req.user._id + "")
      return next(
        ErrorHandler(
          404,
          "You cannot accept this bid because you are not the errand owner",
          {}
        )
      );

    await bidding.updateOne({
      status: "Accepted",
    });

    await errand.updateOne({
      status: "Accepted",
      acceptedAt: Date.now(),
    });

    await Bidding.updateMany(
      {
        userId: { $ne: bidding.userId },
        errandId: errand._id,
      },
      {
        status: "Rejected",
      }
    );

    const updatedErrand = await Errand.findOne({ _id: req.params.id });
    res.status(201).json({
      status: "success",
      data: {
        data: updatedErrand,
      },
    });
  }
);

// console.log(await createBidding())

export {
  deleteBidding,
  acceptBidding,
  getAllBidding,
  getBidding,
  getAllUserBidding,
};
