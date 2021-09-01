import { IComplimentsRepository } from "@modules/compliments/repositories/IComplimentsRepository";
import { injectable, inject} from "tsyringe";


@injectable()
class ListUserSendComplimentsUseCase {
    constructor(
        @inject("ComplimentsRepository")
        private repository: IComplimentsRepository,
    ) {}
    async execute(user_id: string) {
        const compliments = await this.repository.listSendCompliments(user_id);

        return compliments;
    }
}


export { ListUserSendComplimentsUseCase }