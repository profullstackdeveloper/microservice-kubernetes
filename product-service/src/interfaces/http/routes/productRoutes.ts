import { Router } from "express";
import { ProductController } from "../controllers/productController";
import { ProductService } from "@src/application/services/ProductService";
import { ProductRepositoryImpl } from "@src/infrastructure/repositories/productRepositoryImpl";

const router = Router();
const productRepository = new ProductRepositoryImpl();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

router.get("/", (req, res) => productController.getAllProducts(req, res));
router.get("/:id", (req, res) => productController.getProductById(req, res));
router.post("/", (req, res) => productController.createProduct(req, res));
router.put("/:id", (req, res) => productController.updateProduct(req, res));
router.delete("/:id", (req, res) => productController.deleteProduct(req, res));

export default router;
