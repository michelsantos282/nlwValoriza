import { Request, Response} from "express";
import { container } from "tsyringe";
import { CreateComplimentUseCase } from "./CreateComplimentUseCase";

class CreateComplimentController {
    async handle(request: Request, response: Response) {
        const {tag_id, user_receiver, message} = request.body;
        const { user_id } = request;

        const createComplimentService = container.resolve(CreateComplimentUseCase);

        const compliment = await createComplimentService.execute({
            tag_id, 
            user_sender: user_id, 
            user_receiver, 
            message
        });

        return response.status(200).send();

    }
}

export { CreateComplimentController }