import { Request, Response } from "express";
import { userStatus } from "../enums/user";
import getToken from "../helpers/generate-jwt";
import BlockedUser from "../models/blocked_user";
import Role from "../models/role";
import User from "../models/user";

export const getUsers = async (req: any, res: Response) => {

    const users = await User.findAll({
        include: [{
            model: Role,
            attributes: ['id', 'name'],
        }]
    });

    res.json({
        users
    });
}

export const getUser = async (req: Request, res: Response) => {

    const { id } = req.params;

    const user: any = await User.findByPk(id, {
        include: [{
            model: Role
        }]
    });

    if (!user) {
        return res.status(404).json({
            msg: 'Usuario no encontrado'
        });
    }

    res.json({
        user
    });
}

export const getUserByToken = async (req: any, res: Response) => {

    const user: any = await User.findByPk(req.userId, {
        include: [{
            model: Role
        }]
    });

    if (!user) {
        return res.status(404).json({
            msg: 'Usuario no encontrado'
        });
    }

    res.json({
        user
    });
}

export const postUser = async (req: Request, res: Response) => {

    const { body } = req;

    try {
        const existName = await User.findOne({
            where: {
                userName: body.userName
            }
        });

        const existPhone = await User.findOne({
            where: {
                phone: body.phone
            }
        });

        if (existName || existPhone) {
            return res.status(404).json({
                msg: 'Ya existe un usuario con el nombre o tlf ingresado'
            });
        }

        body.status = userStatus.ACTIVE;
        const usuario = User.build(body);
        await usuario.save();

        const token = await getToken(usuario);

        res.status(201).json({
            usuario,
            token
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            msg: 'Error al insertar un usuario'
        });
    }
}

export const putUser = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;

    try {
        const usuario = await User.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: 'El usuario con el id ingresado no existe'
            });
        }

        await usuario.update(body);

        res.json(usuario);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            msg: 'Error al editar un usuario'
        });
    }
}

export const deleteUser = async (req: Request, res: Response) => {

    const { id } = req.params;

    const usuario = await User.findByPk(id);

    if (!usuario) {
        return res.status(404).json({
            msg: 'El usuario con el id ingresado no existe'
        });
    }

    await usuario.update({ status: userStatus.INACTIVE });

    res.json({
        usuario
    });
}

export const blockUser = async (req: any, res: Response) => {

    let body = {
        userSenderId : req.userId,
        userBlockedId : req.params.id,
        status : "Blocked"
    };

    try {
        const blocked = BlockedUser.build(body);
        await blocked.save();

        res.status(201).json(blocked);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            msg: 'Error al bloquear a un user'
        });
    }
}

export const unblockUser = async (req: any, res: Response) => {

    let body = {
        userSenderId : req.userId,
        userBlockedId : req.params.id,
        status : "Unblocked"
    };

    try {
        const blocked = await BlockedUser.findOne({
            where: {
                userSenderId: body.userSenderId,
                userBlockedId: body.userBlockedId,
            }
        });
        if (!blocked) {
            return res.status(404).json({
                msg: 'El bloqueo ingresado no existe'
            });
        }

        await blocked.update(body);

        res.json(blocked);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            msg: 'Error al desbloquear un user'
        });
    }
}