import { Order } from "@src/domain/entities/order";
import { OrderRepository } from "../../domain/repositories/orderRepository";

export class OrderService {
    constructor(private orderRepository: OrderRepository) {}

    async getAllOrders(): Promise<Order[]> {
        return this.orderRepository.getAllOrders();
    }

    async getOrderById(id: string): Promise<Order | null> {
        return this.orderRepository.getOrderById(id);
    }

    async createOrder(orderData: Omit<Order, "id">): Promise<Order> {
        const order = this.orderRepository.createOrder(orderData);
        return order;
    }

    async updateOrder(id: string, orderData: Omit<Order, "id">): Promise<number[]> {
        const order = this.orderRepository.updateOrder(orderData, id);
        return order;
    }

    async deleteOrder(id: string): Promise<void> {
        return this.orderRepository.deleteOrder(id);
    }
}
