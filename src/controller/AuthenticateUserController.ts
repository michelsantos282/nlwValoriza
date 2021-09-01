import { Request, Response} from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

class AuthenticateUserController {
    async handle(request: Request, response: Response) {
        const {email, password } = request.body;
        const authenticateUser = new AuthenticateUserService()

        const token = await authenticateUser.execute({email, password});

        return response.json(token);
    }
}

export { AuthenticateUserController }