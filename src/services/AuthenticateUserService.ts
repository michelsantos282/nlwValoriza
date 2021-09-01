import { compare } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import { sign } from "jsonwebtoken";

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {

    async execute({email, password}: IAuthenticateRequest) {

        //Verificar se email existe
        const repository = getCustomRepository(UsersRepository);
        const user = await repository.findOne({email});

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

export { AuthenticateUserService }