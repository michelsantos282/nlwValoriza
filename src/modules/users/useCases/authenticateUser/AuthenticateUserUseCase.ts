import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { injectable, inject } from "tsyringe";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

interface IAuthenticateRequest {
    email: string;
    password: string;
}

@injectable()
class AuthenticateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private repository: IUsersRepository,
    ) {}

    async execute({email, password}: IAuthenticateRequest) {

        //Verificar se email existe
        const user = await this.repository.findByEmail(email);

        if(!user) {
            throw new Error("Email/Password incorrect!");
        }

        //Verificar se senha está correta
        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch) {
            throw new Error("Email/Password incorrect!");
        }

        //Gerar token
        const token = sign({
            email: user.email,
        }, "c0370fd286cc4873db39a84d22f7e8b3", {
            subject: user.id,
            expiresIn: "1d"
        })

        return token;
    }
}

export { AuthenticateUserUseCase }