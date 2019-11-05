import users from '../Model/userModel';
import generateToken from '../../helpers/generateToken';
import hashPassword from '../../helpers/hashPassword';
import checkPassword from '../../helpers/checkPassword';

class UsersClass {
    async createUser(req, res) {
        const {
            firstName, lastName, email, password,
        } = req.body;
        const userFound = await users.find(user => user.email === email);
        if (userFound) {
            return res.status(409).json({
                status: 409,
                error: `user with ${userFound.email} already exists`,
            });
        }
        const id = users.length + 1;
        const pass = hashPassword(password);
        const newUser = {
            id, firstName, lastName, email, password: pass,
        };
        users.push(newUser);
        const token = generateToken(id, email);
        return res.status(201).json({
            status: 201,
            message: 'User created',
            data: {
                id,
                firstName,
                lastName,
                email,
            },
            token,
        });
    }

    async login(req, res) {
        const { email, password } = req.body;
        const userFound = await users.find(user => user.email === email && checkPassword(password, user.password));
        if (!userFound) {
            return res.status(401).json({
                status: 401,
                error: 'Invalid username / password',
            });
        }
        const { id } = userFound;
        const token = generateToken(id, email);
        return res.status(200).json({
            status: 200,
            message: 'User logged in successfully',
            data: {
                token,
            },
        });
    }
}
export default UsersClass;
