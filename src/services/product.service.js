import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";

/**
 * Create a new product.
 * @param {Object} productData - Data for the new product.
 * @returns {Object} The created product.
 */

const createProduct = async (data) => {
  const { name, description, price, category, brand, stock, images } = data;

  if (price < 0 || stock < 0) {
    throw new Error("Price and stock must be positive values.");
  }

  const formattedImages = (images || []).map((image) => ({
    url: image.url,
    alt: image.alt || "",
  }));

  const productData = {
    name,
    description,
    price,
    category,
    brand,
    stock,
    images: formattedImages,
  };

  const product = await Product.create(productData);

  return product;
};

/**
 * Get all products with optional filtering, sorting, and pagination.
 * @param {Object} filters - Filters for querying products.
 * @param {Object} options - Pagination and sorting options.
 * @returns {Object} List of products and total count.
 */

const getAllProducts = async (filters = {}, options = {}) => {
  const {
    page = 1,
    limit = 20,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = options;
  const skip = (page - 1) * limit;

  const totalProducts = await Product.countDocuments(filters);

  const products = await Product.find(filters)
    .sort({ [sortBy]: sortOrder === "desc" ? -1 : 1 })
    .skip(skip)
    .limit(limit);

  return { totalProducts, products };
};

/**
 * Get a single product by ID.
 * @param {string} productId - ID of the product.
 * @returns {Object} The product data.
 */
const productById = async (productId) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(404, "Product not found.");
  }

  return product;
};

/**
 * Update an existing product by ID.
 * @param {string} productId - ID of the product.
 * @param {Object} updateData - Data to update.
 * @returns {Object} The updated product.
 */

const updateProductById = async (productId, data) => {
  const { name, description, price, category, brand, stock, images } = data;

  let updateData = {};

  const formattedImages = (images || []).map((image) => ({
    url: image.url,
    alt: image.alt || "",
  }));

  if (name) updateData.name = name;
  if (description) updateData.description = description;
  if (price) updateData.price = price;
  if (category) updateData.category = category;
  if (brand) updateData.brand = brand;
  if (stock) updateData.stock = stock;
  if (formattedImages) updateData.images = formattedImages;

  if (Object.keys(updateData).length === 0) {
    throw new Error("No fields to update.");
  }

  const product = await Product.findByIdAndUpdate(productId, updateData, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new ApiError(404, "Product not found.");
  }

  return product;
};

/**
 * Delete a product by ID.
 * @param {string} productId - ID of the product.
 * @returns {Object} The deleted product.
 */

const deleteProductById = async (productId) => {
  const product = await Product.findByIdAndDelete(productId);

  if (!product) {
    throw new ApiError(404, "Product not found.");
  }

  return product;
};

export {
  createProduct,
  getAllProducts,
  productById,
  updateProductById,
  deleteProductById,
};
