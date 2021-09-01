import { getCustomRepository } from "typeorm"
import { ComplimentsRepository } from "../repositories/ComplimentsRepository";
import { UsersRepository } from "../repositories/UsersRepository";

interface IComplimentRequest {
    user_receiver: string;
    user_sender: string;
    tag_id: string;
    message: string;
}

class CreateComplimentService {

    async execute({user_receiver, user_sender, tag_id, message} : IComplimentRequest) {
        const complimentsRepository = getCustomRepository(ComplimentsRepository);
        const usersRepository = getCustomRepository(UsersRepository);


        if(user_sender === user_receiver) {
            throw new Error("You can't give compliments to yourself");
        }

        const userReceiver = await usersRepository.findOne(user_receiver);

        if(!userReceiver) {
            throw new Error("Invalid User receiver");
        }

        const compliment = complimentsRepository.create({
            tag_id,
            user_receiver,
            user_sender,
            message
        });

        await complimentsRepository.save(compliment);

        return compliment;
        
    }
}

export { CreateComplimentService }