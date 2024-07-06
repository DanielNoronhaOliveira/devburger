import { next } from "sucrase/dist/types/parser/tokenizer";
import authConfig from "../../config/auth";
import { request, response } from "express";

function  authMiddleware(request, response, next){
    return response.status(401).json({ error: ' token não fornecido '});
}

const token = authToken.split('').at(1);

try {
    Jwt.verity(token, authConfig.secret, (err, decoded) =>{
        if(err){
            throw new Error();
        }

        request.userId = decoded.id;
        request.userName = decoded.name;
    });
} catch (err){
    return response.status(401).json({ error: 'o token é inválido'})
}

return next();


export default authMiddleware;