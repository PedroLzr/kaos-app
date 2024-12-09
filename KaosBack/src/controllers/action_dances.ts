import { Request, Response } from "express";
import Action_Dance from "../models/action_dance";

export const postDance = async (req: any, res: Response) => {

    const { body } = req;

    try {
        body.userSenderId = req.userId;

        const dance = Action_Dance.build(body);
        await dance.save();

        res.status(201).json(dance);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            msg: 'Error al insertar un dance'
        });
    }
}

export const deleteDance = async (req: any, res: Response) => {

    const { body } = req;

    try {
        await Action_Dance.destroy({
            where: {
                userSenderId: req.userId,
                userReceiverId: body.userReceiverId,
                eventId: body.eventId
            }
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            msg: 'Error al eliminar un dance'
        });
    }
}