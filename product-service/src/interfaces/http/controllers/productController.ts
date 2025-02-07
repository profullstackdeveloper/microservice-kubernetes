import { Request, Response } from "express";
import { ProductService } from "@src/application/services/ProductService";

export class ProductController {
    constructor(private productService: ProductService) {}

    async getAllProducts(req: Request, res: Response): Promise<void> {
        try {
            const products = await this.productService.getAllProducts();
            res.json(products);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async getProductById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const product = await this.productService.getProductById(id);
            if (!product) {
                res.status(404).send("Product not found");
                return;
            }
            res.json(product);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async createProduct(req: Request, res: Response): Promise<void> {
        try {
            const product = await this.productService.createProduct(req.body);
            res.status(201).json(product);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async updateProduct(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const product = await this.productService.updateProduct(id, req.body);
            res.json(product);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async deleteProduct(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await this.productService.deleteProduct(id);
            res.status(204).send();
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}
