import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { ICreateUserDTO, IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private repository: IUsersRepository,
    ) {}

    async execute({name, email, password, admin = false} : ICreateUserDTO) {
        const userAlreadyExists = await this.repository.findByEmail(email);

        if(!email) {
            throw new Error("Email Incorrect!");
        }

        if(userAlreadyExists) {
            throw new Error("User already Exists!");
        }

        const hashPassword = await hash(password, 8);

        const user = this.repository.create({
            name,
            email,
            password: hashPassword,
            admin
        });
        
        return user;
    }
}


export { CreateUserUseCase }