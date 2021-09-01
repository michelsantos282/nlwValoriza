import { ICreateComplimentsDTO } from "../dtos/ICreateComplimentsDTO";
import { Compliment } from "../infra/typeorm/entities/Compliment";

interface IComplimentsRepository {
    create(data: ICreateComplimentsDTO): Promise<void>;
    listSendCompliments(user_id: string): Promise<Compliment[]>
    listReceiveCompliments(user_id: string): Promise<Compliment[]>
}

export { IComplimentsRepository, ICreateComplimentsDTO }