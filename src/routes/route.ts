import { Router } from "express";
import PaymentController from "../controllers/PaymentController";

const route = Router();

route.post("/payments", PaymentController.store);
route.get("/payments", PaymentController.index);
route.delete("/payments/:id", PaymentController.destroy);

export default route;
