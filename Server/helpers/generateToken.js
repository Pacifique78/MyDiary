import jwt from 'jsonwebtoken';

const generateToken = (req) => {
    const {
        firstName,
        lastName,
        email,
    } = req.body;
    return jwt.sign({
        firstName, lastName, email,
    }, process.env.secret, {
        expiresIn: '7d',
    });
};
export default generateToken;
