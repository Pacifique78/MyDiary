import jwt from 'jsonwebtoken';

const generateToken = (id, email) => jwt.sign({
    id, email,
}, process.env.secret, {
    expiresIn: '5h',
});
export default generateToken;
