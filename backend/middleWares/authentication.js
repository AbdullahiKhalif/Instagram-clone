import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/config.js';
export const authorizationMiddleware = async(req, res, next) => {

    const token = req.cookies.token;
    if(!token) return res.status(403).send("Access denied! PLease Login First!");
    try{
        const decodedToken = jwt.verify(token, jwtSecret);
        req.user = decodedToken;

        next();
    }catch(err){
        console.log("ERROR AT Auth Middleware", err);
        res.status(400).send(err.message);
    }
}