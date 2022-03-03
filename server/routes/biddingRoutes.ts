import express from "express";
import {
  deleteBidding,
  acceptBidding,
  createBidding,
  getAllErrandBids,
  getBidding,
  getAllUserBidding,
} from "./../controllers/biddingController";

import { protect } from "./../controllers/authController";

const router = express.Router();

router.use(protect);

// Protect all routes after this middleware

router.route("/:errandId").get(getAllErrandBids).post(createBidding);
router.route("/:id").get(getBidding).delete(deleteBidding).patch(acceptBidding);
router.route("/user/:id").get(getAllUserBidding);

export default router;
