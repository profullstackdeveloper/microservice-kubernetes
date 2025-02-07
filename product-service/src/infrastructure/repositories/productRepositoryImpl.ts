import { ProductRepository } from "../../domain/repositories/productRepository";
import { Product } from "../../domain/entities/product";
import { query } from "../database/db";

export class ProductRepositoryImpl implements ProductRepository {
    async getAllProducts(): Promise<Product[]> {
        const result = await query("SELECT * FROM products");
        return result.rows.map((row: any) => new Product(row.id, row.name, row.description, row.price, row.stock));
    }

    async getProductById(id: string): Promise<Product | null> {
        const result = await query("SELECT * FROM products WHERE id = $1", [id]);
        if (result.rows.length === 0) return null;
        const row = result.rows[0];
        return new Product(row.id, row.name, row.description, row.price, row.stock);
    }

    async createProduct(product: Product): Promise<Product> {
        const result = await query(
            "INSERT INTO products (name, description, price, stock) VALUES ($1, $2, $3, $4) RETURNING *",
            [product.name, product.description, product.price, product.stock]
        );
        const row = result.rows[0];
        return new Product(row.id, row.name, row.description, row.price, row.stock);
    }

    async updateProduct(product: Product): Promise<Product> {
        const result = await query(
            "UPDATE products SET name = $1, description = $2, price = $3, stock = $4 WHERE id = $5 RETURNING *",
            [product.name, product.description, product.price, product.stock, product.id]
        );
        const row = result.rows[0];
        return new Product(row.id, row.name, row.description, row.price, row.stock);
    }

    async deleteProduct(id: string): Promise<void> {
        await query("DELETE FROM products WHERE id = $1", [id]);
    }
}
