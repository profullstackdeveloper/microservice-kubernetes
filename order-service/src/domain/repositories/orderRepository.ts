import { Order } from "../entities/order";

export interface OrderRepository {
    getAllOrders(): Promise<Order[]>;
    getOrderById(id: string): Promise<Order | null>;
    createOrder(order: Omit<Order, "id">): Promise<Order>;
    updateOrder(order: Omit<Order, "id">, id: string): Promise<number[]>;
    deleteOrder(id: string): Promise<void>;
}
