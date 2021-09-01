import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import {classToPlain} from "class-transformer";

class ListUsersService {

    async execute() {
        const repository = getCustomRepository(UsersRepository);
        const users = await repository.find();

        return classToPlain(users);
    }
}

export { ListUsersService }