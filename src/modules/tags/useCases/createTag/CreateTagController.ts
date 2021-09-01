import {Request, Response} from "express"
import { container } from "tsyringe";
import { CreateTagUseCase } from "./CreateTagUseCase";

class CreateTagController {

    async handle(request: Request, response: Response) {
        const createTagUseCase = container.resolve(CreateTagUseCase);
        const {name} = request.body;

        const tag = await createTagUseCase.execute({name});

        return response.status(201).send();
    }
}

export {CreateTagController}