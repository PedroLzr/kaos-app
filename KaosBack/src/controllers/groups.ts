import { Request, Response } from "express";
import Group from "../models/group";
import User from "../models/user";
import GroupComment from "../models/group_comment";

export const getGroups = async (req: Request, res: Response) => {

    const groups = await Group.findAll({
        include: [{
            model: User,
            attributes: ['id', 'gender',
            ],
            through: {
                attributes: []
            }
        }]
    });

    res.json({
        groups
    });
}

export const getGroup = async (req: Request, res: Response) => {

    const { id } = req.params;

    const group = await Group.findByPk(id, {
        include: [{
            model: User,
            attributes: ['id', 'fullName'],
            through: {
                attributes: []
            }
        },
        {
            model: GroupComment,
            attributes: ['id', 'text', 'createdAt'],
            include: [{
                model: User,
                attributes: ['id', 'fullName']
            }]
        }]
    });

    if (!group) {
        return res.status(404).json({
            msg: 'Grupo no encontrado'
        });
    }

    res.json({
        group
    });
}

export const getMyGroups = async (req: any, res: Response) => {

    const user: any = await User.findByPk(req.userId, {
        include: [{
            model: Group,
            attributes: ['id', 'name'],
            through: {
                attributes: []
            }
        }]
    });

    if (!user) {
        return res.status(404).json({
            msg: 'No existe el usuario'
        });
    }

    const groups = user.Groups;

    res.json({
        groups
    });
}

export const postGroup = async (req: any, res: Response) => {

    const { body } = req;

    try {

        const existsGroup = await Group.findOne({
            where: {
                name: body.name
            }
        });

        if (existsGroup) {
            return res.status(404).json({
                msg: 'Ya existe un grupo con el nombre ingresado'
            });
        }

        const group: any = Group.build(body);
        await group.save();

        // Añadir el usuario que ha creado el grupo al mismo
        const user = await User.findByPk(req.userId);
        await group.addUser(user);

        res.status(201).json(group);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            msg: 'Error al insertar un grupo'
        });
    }
}

export const putGroup = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;

    try {
        const group = await Group.findByPk(id);
        if (!group) {
            return res.status(404).json({
                msg: 'El grupo con el id ingresado no existe'
            });
        }

        await group.update(body);

        res.json(group);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            msg: 'Error al editar el grupo'
        });
    }
}

export const deleteGroup = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const group = await Group.findByPk(id);

        if(!group){
            return res.status(404).json({
                msg: 'El grupo con el id ingresado no existe'
            });
        }

        await group.destroy();

        res.json({
            group
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            msg: 'Error al eliminar un grupo'
        });
    }
}

export const joinGroup = async (req: any, res: Response) => {

    const { body } = req;
    body.userId = req.userId;

    try {
        const user = await User.findByPk(body.userId);
        if (!user) {
            return res.status(404).json({
                msg: 'El usuario con el id ingresado no existe'
            });
        }

        const group: any = await Group.findByPk(body.groupId);
        if (!group) {
            return res.status(404).json({
                msg: 'El grupo con el id ingresado no existe'
            });
        }

        await group.addUser(user);

        res.json(group);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            msg: 'Error al añadir un usuario al grupo'
        });
    }
}

export const leaveGroup = async (req: any, res: Response) => {

    const { body } = req;
    body.userId = req.userId;

    try {
        const group: any = await Group.findByPk(body.groupId);
        if (!group) {
            return res.status(404).json({
                msg: 'El grupo con el id ingresado no existe'
            });
        }

        const user = await group.getUsers({
            where: {
                id: body.userId
            }
        })

        if (user.length == 0) {
            return res.status(404).json({
                msg: 'El usuario con el id ingresado no está en el grupo'
            });
        }

        await group.removeUser(user);

        res.json(group);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            msg: 'Error al eliminar un usuario del grupo'
        });
    }
}

export const sendGroupInvitation = async (req: any, res: Response) => {

    // TODO

}

export const postComment = async (req: any, res: Response) => {

    const { body } = req;

    body.UserId = req.userId;
    try {

        const comment = GroupComment.build(body);
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

    const comment = await GroupComment.findByPk(id);

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