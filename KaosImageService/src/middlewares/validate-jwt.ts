import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const validateJWT = (req: any, res: Response, next: any) => {

    // if (req.path == '/api/auth/login') {
    //     return next();
    // }

    const token = req.header('auth-x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No se ha enviado ningún token'
        });
    }

    try {
        const payload: any = jwt.verify(token, process.env.JWT_PRIVATE_KEY || 'DefaultPrivateKey');
        req.userId = payload.id;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token no válido'
        });
    }
}

export default validateJWT;