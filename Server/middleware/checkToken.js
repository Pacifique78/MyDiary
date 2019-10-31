import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
export const checkToken = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        const verified = jwt.verify(authorization, process.env.secret);
        req.tokenData = verified;
        next();
    } catch (error) {
        return res.status(401).json({
            status: 401,
            error: 'Token not provided',
        });
    }
};
export default checkToken;
