import { Product } from "../../domain/entities/product";
import { ProductRepository } from "../../domain/repositories/productRepository";

export class ProductService {
    constructor(private productRepository: ProductRepository) {}

    async getAllProducts(): Promise<Product[]> {
        return this.productRepository.getAllProducts();
    }

    async getProductById(id: string): Promise<Product | null> {
        return this.productRepository.getProductById(id);
    }

    async createProduct(productData: Omit<Product, "id">): Promise<Product> {
        const product = new Product(null, productData.name, productData.description, productData.price, productData.stock);
        return this.productRepository.createProduct(product);
    }

    async updateProduct(id: string, productData: Omit<Product, "id">): Promise<Product> {
        const product = new Product(id, productData.name, productData.description, productData.price, productData.stock);
        return this.productRepository.updateProduct(product);
    }

    async deleteProduct(id: string): Promise<void> {
        return this.productRepository.deleteProduct(id);
    }
}