import {Request, Response, NextFunction} from "express";
import { verify } from "jsonwebtoken";

interface iPayLoad {
    sub: string
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization;

    if(!authToken) {
        return response.status(401).end();
    }
    const [, token] = authToken.split(" ");

    try {
        const { sub } = verify(token, "c0370fd286cc4873db39a84d22f7e8b3") as iPayLoad;
        request.user_id = sub;
        
        return next();
    } catch(err) {
        return response.status(401).end()
    }
}