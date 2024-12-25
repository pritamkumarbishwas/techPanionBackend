import Joi from "joi";

const createProduct = {
  body: Joi.object().keys({
    name: Joi.string().min(3).max(100).required().messages({
      "string.base": "Name must be a string",
      "string.empty": "Name is required",
      "string.min": "Name must be at least 3 characters long",
      "string.max": "Name must not exceed 100 characters",
      "any.required": "Name is required",
    }),
    description: Joi.string().min(10).max(500).required().messages({
      "string.base": "Description must be a string",
      "string.empty": "Description is required",
      "string.min": "Description must be at least 10 characters long",
      "string.max": "Description must not exceed 500 characters",
      "any.required": "Description is required",
    }),
    price: Joi.number().min(0).required().messages({
      "number.base": "Price must be a number",
      "number.min": "Price must be a positive number",
      "any.required": "Price is required",
    }),
    category: Joi.string()
      .valid("Electronics", "Clothing", "Furniture", "Books", "Food")
      .required()
      .messages({
        "string.base": "Category must be a string",
        "string.empty": "Category is required",
        "any.required": "Category is required",
        "any.only":
          "Category must be one of the allowed values (Electronics, Clothing, Furniture, Books, Food)",
      }),
    brand: Joi.string().max(50).optional().messages({
      "string.base": "Brand must be a string",
      "string.max": "Brand must not exceed 50 characters",
    }),
    stock: Joi.number().min(0).required().messages({
      "number.base": "Stock must be a number",
      "number.min": "Stock must be a positive number or zero",
      "any.required": "Stock is required",
    }),
    images: Joi.array()
      .items(
        Joi.object({
          url: Joi.string().uri().required(),
          alt: Joi.string().optional(),
        })
      )
      .optional(),
  }),
};

const getProductById = {
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required().messages({
      "string.base": "Product ID must be a string",
      "string.hex": "Product ID must be a valid ObjectId",
      "string.length": "Product ID must be 24 characters long",
      "any.required": "Product ID is required",
    }),
  }),
};

const updateProduct = {
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required().messages({
      "string.base": "Product ID must be a string",
      "string.hex": "Product ID must be a valid ObjectId",
      "string.length": "Product ID must be 24 characters long",
      "any.required": "Product ID is required",
    }),
  }),
  body: Joi.object().keys({
    name: Joi.string().min(3).max(100).optional().messages({
      "string.base": "Name must be a string",
      "string.empty": "Name is required",
      "string.min": "Name must be at least 3 characters long",
      "string.max": "Name must not exceed 100 characters",
    }),
    description: Joi.string().min(10).max(500).optional().messages({
      "string.base": "Description must be a string",
      "string.empty": "Description is required",
      "string.min": "Description must be at least 10 characters long",
      "string.max": "Description must not exceed 500 characters",
    }),
    price: Joi.number().min(0).optional().messages({
      "number.base": "Price must be a number",
      "number.min": "Price must be a positive number",
    }),
    category: Joi.string()
      .valid("Electronics", "Clothing", "Furniture", "Books", "Food")
      .optional()
      .messages({
        "string.base": "Category must be a string",
        "string.empty": "Category is required",
        "any.only":
          "Category must be one of the allowed values (Electronics, Clothing, Furniture, Books, Food)",
      }),
    brand: Joi.string().max(50).optional().messages({
      "string.base": "Brand must be a string",
      "string.max": "Brand must not exceed 50 characters",
    }),
    stock: Joi.number().min(0).optional().messages({
      "number.base": "Stock must be a number",
      "number.min": "Stock must be a positive number or zero",
    }),
    images: Joi.array()
      .items(
        Joi.object({
          url: Joi.string().uri().required(),
          alt: Joi.string().optional(),
        })
      )
      .optional(),
  }),
};

const deleteProduct = {
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required().messages({
      "string.base": "Product ID must be a string",
      "string.hex": "Product ID must be a valid ObjectId",
      "string.length": "Product ID must be 24 characters long",
      "any.required": "Product ID is required",
    }),
  }),
};

export { createProduct, getProductById, updateProduct, deleteProduct };
