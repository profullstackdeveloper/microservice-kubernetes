import { Product } from "../entities/product";

export interface ProductRepository {
    getAllProducts(): Promise<Product[]>;
    getProductById(id: string): Promise<Product | null>;
    createProduct(product: Product): Promise<Product>;
    updateProduct(product: Product): Promise<Product>;
    deleteProduct(id: string): Promise<void>;
}
