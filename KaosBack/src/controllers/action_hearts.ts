import { Request, Response } from "express";
import Action_Heart from "../models/action_heart";

export const postHeart = async (req: any, res: Response) => {

    const { body } = req;

    try {
        body.userSenderId = req.userId;

        const heart = Action_Heart.build(body);
        await heart.save();

        res.status(201).json(heart);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            msg: 'Error al insertar un heart'
        });
    }
}

export const deleteHeart = async (req: any, res: Response) => {

    const { body } = req;

    try {
        await Action_Heart.destroy({
            where: {
                userSenderId: req.userId,
                userReceiverId: body.userReceiverId,
                eventId: body.eventId
            }
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            msg: 'Error al eliminar un heart'
        });
    }
}