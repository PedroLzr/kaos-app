import { Request, Response } from "express"

export const getBase64ImageEvent = ( req: Request, res: Response) => {

    res.json({
        msg: "getBase64ImageEvent"
    });
}

export const postBase64ImageEvent = ( req: Request, res: Response) => {

    res.json({
        msg: "postBase64ImageEvent"
    });
}

export const putBase64ImageEvent = ( req: Request, res: Response) => {

    res.json({
        msg: "putBase64ImageEvent"
    });
}

export const deleteBase64ImageEvent = ( req: Request, res: Response) => {

    res.json({
        msg: "deleteBase64ImageEvent"
    });
}