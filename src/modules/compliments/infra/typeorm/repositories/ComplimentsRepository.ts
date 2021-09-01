import { IComplimentsRepository, ICreateComplimentsDTO } from "@modules/compliments/repositories/IComplimentsRepository";
import { getRepository, Repository } from "typeorm";
import { Compliment } from "../entities/Compliment";



class ComplimentsRepository implements IComplimentsRepository{

    private repository: Repository<Compliment>

    constructor() {
        this.repository = getRepository(Compliment);
    }

    async create({user_receiver, user_sender, tag_id, message} : ICreateComplimentsDTO):Promise<void> {

        const compliment = this.repository.create({
            user_receiver,
            user_sender,
            tag_id,
            message
        });

        await this.repository.save(compliment);
    }

    async listSendCompliments(user_id) : Promise<Compliment[]> {
        const sendCompliments = await this.repository.find({
            where: {
                user_sender: user_id
            },
            relations: ["userSender", "userReceiver", "tag"],
        }); 

        return sendCompliments;
    }

    async listReceiveCompliments(user_id) : Promise<Compliment[]> {
        const receiveCompliments = await this.repository.find({
            where: {
                user_receiver: user_id
            },
            relations: ["userSender", "userReceiver", "tag"],
            
        });

        return receiveCompliments;
    }
}

export { ComplimentsRepository }