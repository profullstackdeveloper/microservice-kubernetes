import { DataTypes, Model, ModelAttributes, Optional } from "sequelize";

export interface IOrder {
    id: string | null,
    productId: string,
    quantity: number,
    totalPrice: number,
    status: string
}

export class Order extends Model<IOrder, Optional<IOrder, 'id'>> implements IOrder {
    declare id: string | null;
    declare productId: string;
    declare quantity: number;
    declare totalPrice: number;
    declare status: string;
}

export const OrderModelAttributes: ModelAttributes<Order, Optional<IOrder, 'id'>> = {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    productId: {
        type: DataTypes.STRING,
    },
    quantity: {
        type: DataTypes.INTEGER
    },
    totalPrice: {
        type: DataTypes.INTEGER,
    },
    status: {
        type: DataTypes.STRING
    }
}