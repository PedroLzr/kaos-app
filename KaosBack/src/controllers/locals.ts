import { Request, Response } from "express";
import { localStatus } from "../enums/local";
import Local from "../models/local";
import LocalType from "../models/localtype";
import LocalComment from "../models/local_comment";
import User from "../models/user";

export const getLocals = async (req: Request, res: Response) => {

    const locals = await Local.findAll({
        include: [{
            model: LocalType
        }]
    });

    res.json({
        locals
    });
}

export const getLocal = async (req: Request, res: Response) => {

    const { id } = req.params;

    const local = await Local.findByPk(id, {
        include: [{
            model: LocalType,
            attributes: ['id', 'name']
        },
        {
            model: LocalComment,
            attributes: ['id', 'text', 'createdAt'],
            include: [{
                model: User,
                attributes: ['id', 'fullName']
            }]
        }]
    });

    if (!local) {
        return res.status(404).json({
            msg: 'Local no encontrado'
        });
    }

    res.json({
        local
    });
}

export const getLocalsByCity = async (req: Request, res: Response) => {

    const { city } = req.params;

    const locals = await Local.findAll({
        where: {
            city: city
        },
        include: [{
            model: LocalType
        }]
    });

    res.json({
        locals
    });
}

export const postLocal = async (req: Request, res: Response) => {

    const { body } = req;

    try {

        const existsLocal = await Local.findOne({
            where: {
                name: body.name
            }
        });

        if (existsLocal) {
            return res.status(404).json({
                msg: 'Ya existe un local con el nombre ingresado'
            });
        }

        const local = Local.build(body);
        await local.save();

        res.status(201).json(local);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            msg: 'Error al insertar un local'
        });
    }
}

export const putLocal = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;

    try {
        const local = await Local.findByPk(id);
        if (!local) {
            return res.status(404).json({
                msg: 'El local con el id ingresado no existe'
            });
        }

        await local.update(body);

        res.json(local);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            msg: 'Error al editar un local'
        });
    }
}

export const deleteLocal = async (req: Request, res: Response) => {
    const { id } = req.params;

    const local = await Local.findByPk(id);

    if(!local){
        return res.status(404).json({
            msg: 'El local con el id ingresado no existe'
        });
    }

    await local.update({estado: localStatus.INACTIVE});

    res.json({
        local
    });
}

export const postComment = async (req: any, res: Response) => {

    const { body } = req;

    body.UserId = req.userId;
    try {

        const comment = LocalComment.build(body);
        await comment.save();

        res.status(201).json(comment);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            msg: 'Error al publicar el comentario'
        });
    }
}

export const deleteComment = async (req: any, res: Response) => {

    const { id } = req.params;

    const comment = await LocalComment.findByPk(id);

    if (!comment) {
        return res.status(404).json({
            msg: 'El comentario con el id ingresado no existe'
        });
    }

    await comment.update({ text: 'Comentario eliminado' });

    res.json({
        comment
    });
}