import { IComplimentsRepository } from "@modules/compliments/repositories/IComplimentsRepository";
import { injectable, inject } from "tsyringe";



@injectable()
class ListUserReceiveComplimentsUseCase {
    constructor(
        @inject("ComplimentsRepository")
        private repository: IComplimentsRepository,
    ) {}

    async execute(user_id: string) {
        const compliments = await this.repository.listReceiveCompliments(user_id)

        return compliments;
    }
}


export { ListUserReceiveComplimentsUseCase }