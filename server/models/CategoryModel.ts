import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "An errand  must have a category"],
    message: "Input an errand category",
  },
});
const Category = mongoose.model("Category", categorySchema);

export default Category;
