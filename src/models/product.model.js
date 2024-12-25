import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price must be a positive value"],
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, "Brand is required"],
      trim: true,
    },
    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock must be a positive value or zero"],
    },
    images: [
      {
        url: {
          type: String,
          required: [true, "Image URL is required"],
          trim: true,
        },
        alt: { type: String, default: "", trim: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

productSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Product = mongoose.model("Product", productSchema);

export { Product };
