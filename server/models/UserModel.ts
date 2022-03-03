import mongoose from "mongoose";
import { IUser } from "../utils/interface";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please tell us your firstName!"],
    },
    lastName: {
      type: String,
      required: [true, "Please tell us your lastName!"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },

    phoneNumber: {
      type: String,
      required: [true, "Please tell us your PhoneNumber!"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 8,
      select: false,
    },

    isActive: {
      type: Boolean,
      select: false,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.pre<IUser>("save", async function (next) {
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
