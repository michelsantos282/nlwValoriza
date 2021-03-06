import {Request, Response} from "express";
import { container } from "tsyringe";
import { ListUserReceiveComplimentsUseCase } from "./ListUserReceiveComplimentsUseCase";


class ListUserReceiveComplimentsController {

    async handle(request: Request, response: Response) {
        const {user_id} = request;
        const listReceiveComplimentsService = container.resolve(ListUserReceiveComplimentsUseCase)

        const compliments = await listReceiveComplimentsService.execute(user_id);

        
        return response.json(compliments);
    }
}


export {ListUserReceiveComplimentsController}