import { UsersRepository } from "../../../users/infra/typeorm/repositories/UsersRepository";
import { inject, injectable } from "tsyringe";
import { IComplimentsRepository } from "@modules/compliments/repositories/IComplimentsRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

interface IComplimentRequest {
    user_receiver: string;
    user_sender: string;
    tag_id: string;
    message: string;
}

@injectable()
class CreateComplimentUseCase {

    constructor(
        @inject("ComplimentsRepository")
        private repository: IComplimentsRepository,
        
        @inject("UsersRepository")
        private userRepository: IUsersRepository,
    ) {}

    async execute({user_receiver, user_sender, tag_id, message} : IComplimentRequest) {
        if(user_sender === user_receiver) {
            throw new Error("You can't give compliments to yourself");
        }

        const userReceiver = await this.userRepository.findById(user_receiver);


        if(!userReceiver) {
            throw new Error("Invalid User receiver");
        }

        const compliment = this.repository.create({
            tag_id,
            user_receiver,
            user_sender,
            message
        });

        return compliment;
        
    }
}

export { CreateComplimentUseCase }