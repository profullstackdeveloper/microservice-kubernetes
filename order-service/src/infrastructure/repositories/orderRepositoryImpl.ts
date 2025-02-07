import { OrderRepository } from "../../domain/repositories/orderRepository";
import { Order, OrderModelAttributes } from "../../domain/entities/order";
import { BaseRepo } from "@src/domain/repositories/BaseRepo";
import { ModelStatic, Sequelize } from "sequelize";

export class OrderRepositoryImpl extends BaseRepo implements OrderRepository  {
    private orderInstance: ModelStatic<Order>;

    constructor(sequelize: Sequelize) {
        super('orders', Order, OrderModelAttributes, sequelize);

        this.orderInstance = sequelize.define('orders', OrderModelAttributes, {
            tableName: 'orders',
            modelName: 'orders',
            timestamps: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_bin',
        });

    }

    async getAllOrders(): Promise<Order[]> {
        const result = await this.orderInstance.findAll()
        return result;
    }

    async getOrderById(id: string): Promise<Order | null> {
        const result = await this.orderInstance.findByPk(id);
        return result;
    }

    async createOrder(order: Omit<Order, "id">): Promise<Order> {
        const result = await this.orderInstance.create(order);
        return result;
    }

    async updateOrder(order: Omit<Order, "id">, id: string): Promise<number[]> {
        if(!id) {
            throw new Error('Order id is required!');
        }
        const result = await this.orderInstance.update(order, {
            where: {
                id: id
            }
        })
        return result;
    }

    async deleteOrder(id: string): Promise<void> {
        await this.orderInstance.destroy({
            where: {
                id
            }
        });
    }
}
