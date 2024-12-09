import { Request, Response } from "express";
import Action_Shot from "../models/action_shot";

export const postShot = async (req: any, res: Response) => {

    const { body } = req;

    try {
        body.userSenderId = req.userId;

        const shot = Action_Shot.build(body);
        await shot.save();

        res.status(201).json(shot);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            msg: 'Error al insertar un shot'
        });
    }
}

export const deleteShot = async (req: any, res: Response) => {

    const { body } = req;

    try {
        await Action_Shot.destroy({
            where: {
                userSenderId: req.userId,
                userReceiverId: body.userReceiverId,
                eventId: body.eventId
            }
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            msg: 'Error al eliminar un shot'
        });
    }
}