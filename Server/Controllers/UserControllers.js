import bcrypt from 'bcrypt';
import users from '../Model/userModel';
import generateToken from '../helpers/generateToken';

class UsersClass {
    async createUser(req, res) {
        try {
            const { email } = req.body;
            const userFound = await users.find(user => user.email === email);
            return res.status(409).json({
                status: 409,
                error: `user with ${userFound.email} already exists`,
            });
        } catch (error) {
            const {
                firstName,
                lastName,
                email,
                password,
            } = req.body;
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const newUser = {
                firstName,
                lastName,
                email,
                password: hashedPassword,
            };
            users.push(newUser);
            const token = generateToken(req);
            return res.status(201).json({
                status: 201,
                message: 'User created',
                data: {
                    firstName,
                    lastName,
                    email,
                },
                token,
            });
        }
    }

    async login(req, res) {
        try {
            const {
                email,
                password,
            } = req.body;
            const userFound = await users.find(user => user.email === email);
            const {
                password: hashedPassword,
            } = userFound;
            const compare = await bcrypt.compare(password, hashedPassword);
            if (compare) {
                const token = generateToken(req);
                return res.status(200).json({
                    status: 200,
                    message: 'User logged in successfully',
                    data: {
                        token,
                    },
                });
            }
            return res.status(401).json({
                status: 401,
                error: 'incorrect password',
            });
        } catch (error) {
            return res.status(404).json({
                status: 404,
                error: 'Email not found',
            });
        }
    }
}
const newClass = new UsersClass();
export default newClass;
