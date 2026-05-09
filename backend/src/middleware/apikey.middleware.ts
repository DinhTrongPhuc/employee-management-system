import { Request, Response, NextFunction } from "express";

export const apikeyMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers['api-key'] as string;

    if (!header) {
        return res.status(401).json({ status: 401, message: "Unauthorized" })
    }
    next();
}