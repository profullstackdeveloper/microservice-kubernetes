import { Model, ModelAttributes, ModelStatic, Optional, Sequelize } from "sequelize";

export class BaseRepo {
    public readonly model: ModelStatic<Model<any, any>>;
    public readonly seq: Sequelize | undefined;

    constructor(modelName: string, model: ModelStatic<Model<any, any>>, dataAttributes: ModelAttributes<Model<any, any>, Optional<any, never>>, sequelize: Sequelize) {
        this.model = model;
        this.model.init(dataAttributes, {
            sequelize,
            modelName: modelName,
            timestamps: false,
            tableName: modelName,
            charset: 'utf8mb4',
            collate: 'utf8mb4_bin',
        });
        this.seq = sequelize;
    }
}