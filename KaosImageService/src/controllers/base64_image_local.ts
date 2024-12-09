import { Request, Response } from "express"

export const getBase64ImageLocal = ( req: Request, res: Response) => {

    res.json({
        msg: "getBase64ImageLocal"
    });
}

export const postBase64ImageLocal = ( req: Request, res: Response) => {

    res.json({
        msg: "postBase64ImageLocal"
    });
}

export const putBase64ImageLocal = ( req: Request, res: Response) => {

    res.json({
        msg: "putBase64ImageLocal"
    });
}

export const deleteBase64ImageLocal = ( req: Request, res: Response) => {

    res.json({
        msg: "deleteBase64ImageLocal"
    });
}