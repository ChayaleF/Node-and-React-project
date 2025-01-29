import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user';

const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // חיפוש הטוקן במקומות השונים
        const recieveToken: string | undefined = 
            req.body.token || 
            req.query.token || 
            (req.headers["authorization"]?.split(" ")[1]);

        if (!recieveToken) {
            res.status(403).send("A token is required for authentication");
            return;
        }

        // אימות הטוקן מול מסד הנתונים
        const user = await User.findOne({ where: { userToken: recieveToken } });

        if (!user) {
            res.status(401).send("Invalid Token");
            return;
        }

        next(); // הטוקן תקין - ממשיכים לפונקציה הבאה
    } catch (err) {
        console.error("Token verification error:", err);
        res.status(500).json(`ERROR! ${err}`);
    }
};

export { verifyToken };
