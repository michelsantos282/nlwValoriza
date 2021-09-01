import { UsersRepository } from "../repositories/UsersRepository"
import { getCustomRepository } from "typeorm";
import { hash } from "bcryptjs";


interface IUserRequest {
    name: string,
    email: string,
    password: string,
    admin?: boolean
}

class CreateUserService {

    async execute({name, email, password, admin = false} : IUserRequest) {
        const repository = getCustomRepository(UsersRepository);

        const userAlreadyExists = await repository.findOne({email});

        if(!email) {
            throw new Error("Email Incorrect!");
        }

        if(userAlreadyExists) {
            throw new Error("User already Exists!");
        }

        const hashPassword = await hash(password, 8);

        const user = repository.create({
            name,
            email,
            password: hashPassword,
            admin
        });

        await repository.save(user);

        return user;
    }
}


export { CreateUserService }