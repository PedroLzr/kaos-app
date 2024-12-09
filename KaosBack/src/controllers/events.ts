import { Request, Response } from "express";
import Event from "../models/event";
import EventComment from "../models/event_comment";
import Action_Heart from "../models/action_heart";
import Action_Shot from "../models/action_shot";
import Action_Dance from "../models/action_dance";
import Local from "../models/local";
import User from "../models/user";
import { userGender } from "../enums/user";
import { eventStatus } from "../enums/event";

export const getEvents = async (req: Request, res: Response) => {
    const events = await Event.findAll({
        include: [{
            model: Local,
            attributes: ['id', 'name', 'city']
        },
        {
            model: User,
            attributes: ['id', 'fullName', 'gender'],
            through: {
                attributes: []
            }
        }]
    });

    res.json({
        events
    });
}

export const getEventsByCity = async (req: Request, res: Response) => {

    const { city } = req.params;

    const locals = await Local.findAll({
        where: {
            city: city
        }
    });

    const localsId: any[] = [];

    locals.forEach((local: any) => {
        localsId.push(local.id);
    });

    const eventList = await Event.findAll({
        include: [{
            model: Local,
            attributes: ['id', 'name', 'city']
        },
        {
            model: User,
            attributes: ['id', 'fullName', 'gender'],
            through: {
                attributes: []
            }
        }],
        where: {
            LocalId: localsId
        },
        order: ['date']
    });

    const events: any[] = [];

    let contMale: number = 0;
    let contFemale: number = 0;
    let ageAverage: number = 0;

    eventList.forEach((event: any) => {
        event.Users.forEach((user: any) => {
            if (user.gender == userGender.MALE) {
                contMale++;
            }
            if (user.gender == userGender.FEMALE) {
                contFemale++;
            }

            let yearOfBirth = user.dateofbirth.getFullYear();
            let age = new Date().getFullYear() - yearOfBirth;

            ageAverage += age;
        });

        event.contPeople = event.Users.length;
        event.contMale = contMale;
        event.contFemale = contFemale;
        event.ageAverage = ageAverage / event.Users.length;

        contMale = 0;
        contFemale = 0;
        ageAverage = 0;

        events.push(event);
    });

    res.json({
        events
    });
}

export const getEventsByLocal = async (req: Request, res: Response) => {

    const { localId } = req.params;

    const eventList = await Event.findAll({
        include: [{
            model: Local,
            attributes: ['id', 'name', 'city']
        },
        {
            model: User,
            attributes: ['id', 'fullName', 'gender'],
            through: {
                attributes: []
            }
        }],
        where: {
            LocalId: localId
        },
        order: ['date']
    });

    const events: any[] = [];

    let contMale: number = 0;
    let contFemale: number = 0;
    let ageAverage: number = 0;

    eventList.forEach((event: any) => {
        event.Users.forEach((user: any) => {
            if (user.gender == "MALE") {
                contMale++;
            }
            if (user.gender == "FEMALE") {
                contFemale++;
            }

            let yearOfBirth = user.dateofbirth.getFullYear();
            let age = new Date().getFullYear() - yearOfBirth;

            ageAverage += age;
        });

        event.contPeople = event.Users.length;
        event.contMale = contMale;
        event.contFemale = contFemale;
        event.ageAverage = ageAverage / event.Users.length;

        contMale = 0;
        contFemale = 0;
        ageAverage = 0;

        events.push(event);
    });

    res.json({
        events
    });
}

export const getEvent = async (req: any, res: Response) => {

    const { id } = req.params;

    const event: any = await Event.findByPk(id, {
        include: [{
            model: Local,
            attributes: ['id', 'name', 'city']
        },
        {
            model: User,
            attributes: ['id', 'fullName', 'gender'],
            through: {
                attributes: []
            }
        },
        {
            model: EventComment,
            attributes: ['id', 'text', 'createdAt'],
            include: [{
                model: User,
                attributes: ['id', 'fullName']
            }]
        }]
    });

    if (!event) {
        return res.status(404).json({
            msg: 'Evento no encontrado'
        });
    }

    const eventUsers: any[] = [];

    let contMale: number = 0;
    let contFemale: number = 0;
    let ageAverage: number = 0;

    const searchActions = new Promise<void>((resolve, reject) => {
        event.Users.forEach(async (user: any, index: any, array: any) => {
            const eventUser: any = {};

            eventUser.id = user.id;
            eventUser.fullName = user.fullName;
            eventUser.gender = user.gender;

            if (user.gender == "MALE") {
                contMale++;
            }
            if (user.gender == "FEMALE") {
                contFemale++;
            }

            let yearOfBirth = user.dateofbirth.getFullYear();
            let age = new Date().getFullYear() - yearOfBirth;

            ageAverage += age;

            // Hearts
            const heartSend = await Action_Heart.findOne({
                where: {
                    userSenderId: req.userId,
                    userReceiverId: user.id,
                    eventId: id
                }
            });

            if (heartSend) {
                eventUser.heart_sender = true;
            } else {
                eventUser.heart_sender = false;
            }

            const heartReceived = await Action_Heart.findOne({
                where: {
                    userSenderId: user.id,
                    userReceiverId: req.userId,
                    eventId: event.id
                }
            });

            if (heartReceived) {
                eventUser.heart_receiver = true;
            } else {
                eventUser.heart_receiver = false;
            }

            // Shots
            const shotSend = await Action_Shot.findOne({
                where: {
                    userSenderId: req.userId,
                    userReceiverId: user.id,
                    eventId: id
                }
            });

            if (shotSend) {
                eventUser.shot_sender = true;
            } else {
                eventUser.shot_sender = false;
            }

            const shotReceived = await Action_Shot.findOne({
                where: {
                    userSenderId: user.id,
                    userReceiverId: req.userId,
                    eventId: event.id
                }
            });

            if (shotReceived) {
                eventUser.shot_receiver = true;
            } else {
                eventUser.shot_receiver = false;
            }

            // Dances
            const danceSend = await Action_Dance.findOne({
                where: {
                    userSenderId: req.userId,
                    userReceiverId: user.id,
                    eventId: id
                }
            });

            if (danceSend) {
                eventUser.dance_sender = true;
            } else {
                eventUser.dance_sender = false;
            }

            const danceReceived = await Action_Dance.findOne({
                where: {
                    userSenderId: user.id,
                    userReceiverId: req.userId,
                    eventId: event.id
                }
            });

            if (danceReceived) {
                eventUser.dance_receiver = true;
            } else {
                eventUser.dance_receiver = false;
            }

            eventUsers.push(eventUser);

            if (index === array.length - 1) {
                resolve();
            }
        });
    });

    event.contPeople = event.Users.length;
    event.contMale = contMale;
    event.contFemale = contFemale;
    event.ageAverage = ageAverage / event.Users.length;
    event.users = eventUsers;

    res.json({
        event
    });
}

export const postEvent = async (req: Request, res: Response) => {

    const { body } = req;
    body.status = eventStatus.ACTIVE;

    try {

        const event = Event.build(body);
        await event.save();

        res.status(201).json(event);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            msg: 'Error al insertar un evento'
        });
    }
}

export const putEvent = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;

    try {
        const event = await Event.findByPk(id);
        if (!event) {
            return res.status(404).json({
                msg: 'El evento con el id ingresado no existe'
            });
        }

        await event.update(body);

        res.json(event);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            msg: 'Error al editar un evento'
        });
    }
}

export const deleteEvent = async (req: Request, res: Response) => {
    const { id } = req.params;

    const event = await Event.findByPk(id);

    if (!event) {
        return res.status(404).json({
            msg: 'El evento con el id ingresado no existe'
        });
    }

    await event.update({ status: eventStatus.INACTIVE });

    res.json({
        event
    });
}

export const joinEvent = async (req: any, res: Response) => {

    const { body } = req;

    try {
        const user = await User.findByPk(req.userId);
        if (!user) {
            return res.status(404).json({
                msg: 'El usuario con el id ingresado no existe'
            });
        }

        const event: any = await Event.findByPk(body.eventId);
        if (!event) {
            return res.status(404).json({
                msg: 'El evento con el id ingresado no existe'
            });
        }

        await event.addUser(user);

        res.json(event);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            msg: 'Error al añadir un usuario al evento'
        });
    }
}

export const leaveEvent = async (req: any, res: Response) => {

    const { body } = req;

    try {
        const event: any = await Event.findByPk(body.eventId);
        if (!event) {
            return res.status(404).json({
                msg: 'El evento con el id ingresado no existe'
            });
        }

        const user = await event.getUsers({
            where: {
                id: req.userId
            }
        })

        if (user.length == 0) {
            return res.status(404).json({
                msg: 'El usuario con el id ingresado no está en el evento'
            });
        }

        await event.removeUser(user);

        res.json(event);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            msg: 'Error al eliminar un usuario del evento'
        });
    }
}

export const postComment = async (req: any, res: Response) => {

    const { body } = req;
    body.UserId = req.userId;

    try {
        const comment = EventComment.build(body);
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

    const comment = await EventComment.findByPk(id);

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