import mongoose from "mongoose";

const biddingSchema = new mongoose.Schema({
  errandId: { type: mongoose.SchemaTypes.ObjectId, ref: "Errand" },
  userId: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  status: { type: String, default: "pending" },
});

const Bidding = mongoose.model("Bidding", biddingSchema);

export default Bidding;
