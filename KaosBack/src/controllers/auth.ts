import { Request, Response } from "express";
import User from "../models/user";
import getToken from "../helpers/generate-jwt";
import { userStatus } from "../enums/user";

export const login = async (req: Request, res: Response) => {

    const { userName, phone } = req.body;

    try {
        const user: any = await User.findOne({
            where: {
                userName: userName,
                phone: phone
            }
        });

        if (!user) {
            return res.status(401).json({
                msg: 'Usuario o contraseña incorrectos'
            });
        }

        if (user.status == userStatus.INACTIVE) {
            return res.status(401).json({
                msg: 'Usuario inactivo'
            });
        }

        const token = await getToken(user);
        res.json({
            user,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error al hacer login'
        });
    }
}