import jwt from 'jsonwebtoken';

const generateToken = (id, email) => jwt.sign({
    id, email,
}, process.env.secret, {
    expiresIn: '7d',
});
export default generateToken;
