import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "An errand  must have a category"],
    message: "Input an errand category",
  },
  icon: {
    type: String,
  },

  cloudinary_id: {
    type: String,
  },
});
const Category = mongoose.model("Category", categorySchema);

export default Category;
