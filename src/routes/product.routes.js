import { Router } from "express";
import * as productController from "../controllers/products.controller.js";
import validate from "../middlewares/validate.js";
import * as productValidation from "../validations/product.validation.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product management API
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - description
 *               - category
 *               - brand
 *               - stock
 *               - images
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the product
 *               price:
 *                 type: number
 *                 description: Price of the product
 *               description:
 *                 type: string
 *                 description: Product description
 *               category:
 *                 type: string
 *                 description: Category of the product
 *               brand:
 *                 type: string
 *                 description: Brand of the product
 *               stock:
 *                 type: number
 *                 description: Available stock for the product
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of product image URLs
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Bad request due to invalid data
 */
router.post(
  "/",
  validate(productValidation.createProduct),
  productController.createProducts
);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve all products with optional filters
 *     tags: [Product]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter products by name
 *       - in: query
 *         name: price
 *         schema:
 *           type: number
 *         description: Filter products by price
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter products by category
 *       - in: query
 *         name: brand
 *         schema:
 *           type: string
 *         description: Filter products by brand
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Product ID
 *                   name:
 *                     type: string
 *                     description: Product name
 *                   price:
 *                     type: number
 *                     description: Product price
 *                   description:
 *                     type: string
 *                     description: Product description
 *                   category:
 *                     type: string
 *                     description: Product category
 *                   brand:
 *                     type: string
 *                     description: Product brand
 *                   stock:
 *                     type: number
 *                     description: Product stock
 *                   images:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: List of product image URLs
 */
router.get("/", productController.getAllProduct);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Retrieve a product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product details
 *       404:
 *         description: Product not found with the given ID
 */
router.get(
  "/:id",
  validate(productValidation.getProductById),
  productController.getProductById
);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - description
 *               - category
 *               - brand
 *               - stock
 *               - images
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the product
 *               price:
 *                 type: number
 *                 description: Price of the product
 *               description:
 *                 type: string
 *                 description: Product description
 *               category:
 *                 type: string
 *                 description: Category of the product
 *               brand:
 *                 type: string
 *                 description: Brand of the product
 *               stock:
 *                 type: number
 *                 description: Available stock for the product
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of product image URLs
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Bad request due to invalid data
 *       404:
 *         description: Product not found with the given ID
 */
router.put(
  "/:id",
  validate(productValidation.updateProduct),
  productController.updateProducts
);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found with the given ID
 */
router.delete(
  "/:id",
  validate(productValidation.deleteProduct),
  productController.deleteProducts
);

export default router;
