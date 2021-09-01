
import {classToPlain} from "class-transformer";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class ListUsersUseCase {

    constructor(
        @inject("UsersRepository")
        private repository: IUsersRepository,
    ) {}

    async execute() {
        const users = await this.repository.getAll();

        return classToPlain(users);
    }
}

export { ListUsersUseCase }