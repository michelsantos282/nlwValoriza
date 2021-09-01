import {getRepository, Repository} from "typeorm";
import { ICreateUserDTO, IUsersRepository } from "../../../repositories/IUsersRepository";
import { User } from "../entities/User";


class UsersRepository implements IUsersRepository {

    private repository: Repository<User>

    constructor() {
        this.repository = getRepository(User);
    }

    async create({name, email, password, admin = false}: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            password,
            email,
            admin
        });

        await this.repository.save(user);
    }

    async findByEmail(email: string): Promise<User> {
        const user = this.repository.findOne({email});

        return user;
    }

    async findById(id: string): Promise<User> {
        const user = this.repository.findOne(id);

        return user;
    }

    async getAll(): Promise<User[]> {
        const users = this.repository.find();

        return users;
    }
}


export { UsersRepository }