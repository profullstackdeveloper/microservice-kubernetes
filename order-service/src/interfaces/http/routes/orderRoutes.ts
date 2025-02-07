import { Router } from "express";
import { OrderController } from "../controllers/orderController";
import { OrderService } from "@src/application/services/orderService";
import { OrderRepositoryImpl } from "@src/infrastructure/repositories/orderRepositoryImpl";
import { Postgres } from "@src/infrastructure/database/db";
import Env from "@src/common/Env";

const router = Router();

export let db = new Postgres({
    database: "test_db",
    host: "postgres",
    password: "postgres",
    port: 5432,
    user: "postgres"
});

const orderRepository = new OrderRepositoryImpl(db.getSequelizeInstance());
const orderService = new OrderService(orderRepository);
const orderController = new OrderController(orderService);

router.get("/", (req, res) => orderController.getAllOrders(req, res));
router.get("/:id", (req, res) => orderController.getOrderById(req, res));
router.post("/", (req, res) => orderController.createOrder(req, res));
router.put("/:id", (req, res) => orderController.updateOrder(req, res));
router.delete("/:id", (req, res) => orderController.deleteOrder(req, res));

export default router;
