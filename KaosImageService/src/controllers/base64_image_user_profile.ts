import { Request, Response } from "express"
import UserProfileImageModel from "../models/base64_image_user_profile";

export const getBase64ImageUserProfile = ( req: Request, res: Response) => {

    const { userId } = req.params;

    const imageProfile = UserProfileImageModel.findOne({ userId }).exec();

    if (!imageProfile) {
        return res.status(404).json({
            msg: 'Imagen no encontrada'
        });
    }

    res.json({
        imageProfile
    });
}

export const postBase64ImageUserProfile = ( req: Request, res: Response) => {

    const userProfileImage = new UserProfileImageModel(req.body);
    const imageCreated =  userProfileImage.save();

    res.json({
        imageCreated
    });
}

export const putBase64ImageUserProfile = ( req: Request, res: Response) => {

    const { userId } = req.params;

    const imageUpdated = UserProfileImageModel.findOneAndUpdate({ userId }, req.body, { new: true }).exec();

    res.json({
        imageUpdated
    });
}

export const deleteBase64ImageUserProfile = async ( req: Request, res: Response) => {

    const { userId } = req.params;

    const imageDeleted = await  UserProfileImageModel.findOneAndDelete({ userId }).exec();

    res.json({
        msg: "deleteBase64ImageUserProfile"
    });
}