import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

productSchema.pre("find", function () {
  this.populate("owner");
});

productSchema.pre("findOne", function () {
  this.populate("owner");
});

productSchema.plugin(mongoosePaginate);
const ProductModel = mongoose.model("products", productSchema);

export default ProductModel;
