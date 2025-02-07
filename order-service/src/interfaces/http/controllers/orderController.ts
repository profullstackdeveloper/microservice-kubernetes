import { Request, Response } from "express";
import { OrderService } from "@src/application/services/orderService";

export class OrderController {
    constructor(private orderService: OrderService) {}

    async getAllOrders(req: Request, res: Response): Promise<void> {
        try {
            const orders = await this.orderService.getAllOrders();
            res.json(orders);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async getOrderById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const order = await this.orderService.getOrderById(id);
            if (!order) {
                res.status(404).send("Order not found");
                return;
            }
            res.json(order);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async createOrder(req: Request, res: Response): Promise<void> {
        try {
            const order = await this.orderService.createOrder(req.body);
            res.status(201).json(order);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async updateOrder(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const order = await this.orderService.updateOrder(id, req.body);
            res.json(order);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async deleteOrder(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await this.orderService.deleteOrder(id);
            res.status(204).send();
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}
