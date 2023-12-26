import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const SECRET_KEY = 'onePiece';
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err: any, user: any) => {
        if (err) return res.sendStatus(403);
        // @ts-ignore
        req.userId = user.userId; // Assuming the user ID is encoded in the token
        console.log(user);
        next();
    });
};

export default authenticateToken;
