import { Router } from "express";
import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController";
import { ListUsersController } from "@modules/users/useCases/listUsers/ListUsersController";
import { AuthenticateUserController } from "@modules/users/useCases/authenticateUser/AuthenticateUserController";


const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const authenticateUserController = new AuthenticateUserController();

const usersRoutes = Router();

usersRoutes.post("/", createUserController.handle);
usersRoutes.get("/", listUsersController.handle);
usersRoutes.post("/login", authenticateUserController.handle);


export { usersRoutes }
