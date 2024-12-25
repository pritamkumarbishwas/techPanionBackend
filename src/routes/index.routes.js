import { Router } from "express";
import Product from "./product.routes.js";
import Employee from "./employee.routes.js";

const router = Router();

router.use("/employee", Employee);
router.use("/products", Product);

export default router;
