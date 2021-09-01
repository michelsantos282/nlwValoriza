import {Request, Response} from "express";
import { container } from "tsyringe";
import { ListUserSendComplimentsUseCase } from "./ListUserSendComplimentsUseCase";


class ListUserSendComplimentsController {

    async handle(request: Request, response: Response) {
        const {user_id} = request;
        const listUserSendComplimentsUseCase = container.resolve(ListUserSendComplimentsUseCase)

        const compliments = await listUserSendComplimentsUseCase.execute(user_id);

        
        return response.json(compliments);
    }
}


export {ListUserSendComplimentsController}