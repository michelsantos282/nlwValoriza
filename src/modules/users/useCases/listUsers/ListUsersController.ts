import { Request, Response} from "express";
import { container } from "tsyringe";
import { ListUsersUseCase } from "./ListUsersUseCase";

class ListUsersController {

    async handle(request: Request, response: Response) {
        const listUsersService = container.resolve(ListUsersUseCase);

        const users = await listUsersService.execute();

        return response.json(users);
    }
}

export { ListUsersController }