import { ApiResponse } from "../utils/ApiResponse.js";
import httpStatus from "http-status";
import {
  createProduct,
  getAllProducts,
  productById,
  updateProductById,
  deleteProductById,
} from "../services/product.service.js";

import { asyncHandler } from "../utils/asyncHandler.js";

const createProducts = asyncHandler(async (req, res) => {
  try {
    const product = await createProduct(req.body);

    res
      .status(httpStatus.CREATED)
      .json(
        new ApiResponse(
          httpStatus.CREATED,
          product,
          "Product created successfully"
        )
      );
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});

const getAllProduct = asyncHandler(async (req, res) => {
  try {
    const filters = req.query;
    const products = await getAllProducts(filters);

    res
      .status(httpStatus.OK)
      .json(
        new ApiResponse(
          httpStatus.OK,
          products,
          "Products retrieved successfully"
        )
      );
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});

const getProductById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productById(id);

    res
      .status(httpStatus.OK)
      .json(
        new ApiResponse(
          httpStatus.OK,
          product,
          "Product retrieved successfully"
        )
      );
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});

const updateProducts = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedProduct = await updateProductById(id, updateData);

    res
      .status(httpStatus.OK)
      .json(
        new ApiResponse(
          httpStatus.OK,
          updatedProduct,
          "Product updated successfully"
        )
      );
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});

const deleteProducts = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    await deleteProductById(id);

    res
      .status(httpStatus.OK)
      .json(new ApiResponse(httpStatus.OK, {}, "Product deleted successfully"));
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});

export {
  createProducts,
  getAllProduct,
  getProductById,
  updateProducts,
  deleteProducts,
};
