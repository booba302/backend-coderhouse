import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    default: undefined,
  },
  password: {
    type: String,
    default: "",
    required: true,
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carts",
  },
  role: {
    type: String,
    enum: ["admin", "user", "premium"],
    default: "user",
  },
});

const UserModel = mongoose.model("users", userSchema);
export default UserModel;
