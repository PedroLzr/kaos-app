import { Request, Response } from "express";
import Local from "../models/local";
import LocalType from "../models/localtype";

export const getLocalTypes = async (req: Request, res: Response) => {

    const localTypes = await LocalType.findAll();

    res.json({
        localTypes
    });
}

export const getLocalType = async (req: Request, res: Response) => {

    const { id } = req.params;

    const localType = await LocalType.findByPk(id, {
        include: [{
            model: Local,
            attributes: ['id', 'name']
        }]
    });

    if (!localType) {
        return res.status(404).json({
            msg: 'LocalType no encontrado'
        });
    }

    res.json({
        localType
    });
}

export const postLocalType = async (req: Request, res: Response) => {

    const { body } = req;

    try {

        const existsLocalType = await LocalType.findOne({
            where: {
                name: body.name
            }
        });

        if (existsLocalType) {
            return res.status(404).json({
                msg: 'Ya existe un localType con el nombre ingresado'
            });
        }

        const localType = LocalType.build(body);
        await localType.save();

        res.status(201).json(localType);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            msg: 'Error al insertar un localType'
        });
    }
}

export const putLocalType = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;

    try {
        const localType = await LocalType.findByPk(id);
        if (!localType) {
            return res.status(404).json({
                msg: 'El localType con el id ingresado no existe'
            });
        }

        await localType.update(body);

        res.json(localType);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            msg: 'Error al editar un localType'
        });
    }
}

export const deleteLocalType = async (req: Request, res: Response) => {
    const { id } = req.params;

    const localType = await LocalType.findByPk(id);

    if(!localType){
        return res.status(404).json({
            msg: 'El localType con el id ingresado no existe'
        });
    }

    await localType.destroy();

    res.json({
        localType
    });
}