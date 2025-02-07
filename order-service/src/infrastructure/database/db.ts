import { Pool } from "pg";


import { Sequelize } from 'sequelize';

interface IDatabase {
    connect: Function;
    disconnect: Function;
    getSequelizeInstance: Function;
}

export interface IPostgresConnectionData {
    user: string;
    host: string;
    database: string;
    password: string;
    port: number;
}

export class Postgres implements IDatabase {
    private sequelize: Sequelize;

    constructor({ user, host, database, password, port }: IPostgresConnectionData) {
        this.sequelize = new Sequelize(database, user, password, { dialect: 'postgres', host, port, logging: false });
    }

    public getSequelizeInstance() {
        return this.sequelize;
    }

    public async connect() {
        try {
            await this.sequelize.authenticate();
            console.log('Connection is established successfully.');
        } catch (err: any) {
            console.log('Unable to connect to the database: ', err);
        }
    }

    public async disconnect() {
        try {
            await this.sequelize.close();
            console.log('Disconnected from the database.');
        } catch (err: any) {
            console.log('Unable to disconnect: ', err);
        }
    }

}
