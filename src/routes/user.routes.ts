import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { UserRepository } from "../repositories/user.repository";
import { UserService } from "../services/user.service";

const router = Router();

const repo = new UserRepository();
const service = new UserService(repo);
const controller = new UserController(service);

router.get("/users", controller.getAll);
router.get("/users/:id", controller.getOne);
router.post("/users", controller.create);
router.put("/users/:id", controller.update);
router.delete("/users/:id", controller.delete);

export default router;