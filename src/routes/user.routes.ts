import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const Controller = new UserController();
const router = Router();

router.get("/users", Controller.getUsers);
router.get("/users/:id", Controller.getUser);
router.post("/user", Controller.getUserName);
router.post("/users", Controller.createUsers);
router.put("/users/:id", Controller.updateUsers);
router.delete("/users/:id", Controller.deleteUsers);

export default router;