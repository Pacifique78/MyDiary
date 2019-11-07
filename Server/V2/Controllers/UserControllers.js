import dotenv from 'dotenv';
import generateToken from '../../helpers/generateToken';
import hashPassword from '../../helpers/hashPassword';
import { querry } from '../db';
import checkPassword from '../../helpers/checkPassword';

dotenv.config();
class UsersClass {
    async createUser(req, res) {
        const {
            firstName, lastName, email, password,
        } = req.body;
        const selectQuery = 'SELECT * FROM users where email=$1 ;';
        const value = [email];
        const rows = await querry(selectQuery, value);
        if (rows[0]) {
            return res.status(409).json({
                status: 409,
                error: `user with ${email} already exists`,
            });
        }
        const pass = hashPassword(password);
        const insertQuery = 'INSERT INTO users (firstname, lastname, email, password, notification) VALUES ($1, $2, $3, $4, $5) RETURNING *;';
        const result = await querry(insertQuery, [firstName, lastName, email, pass, 'off']);
        const { id } = result[0];
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
        const selectQuery = 'SELECT * FROM users where email=$1 ;';
        const value = [email];
        const rows = await querry(selectQuery, value);
        if (rows[0] && checkPassword(password, rows[0].password)) {
            const { id } = rows[0];
            const token = generateToken(id, email);
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
            error: 'Invalid username / password',
        });
    }

    async setNotification(req, res) {
        const { id } = req.tokenData;
        const selectQuery = 'SELECT * FROM users where id=$1';
        const result = await querry(selectQuery, [id]);
        const updateQuery = 'UPDATE users set notification = $1 where id=$2';
        if (result[0].notification === 'off') {
            await querry(updateQuery, ['on', id]);
            return res.status(200).json({
                status: 200,
                message: 'notification set on',
            });
        }
        await querry(updateQuery, ['off', id]);
        return res.status(200).json({
            status: 200,
            message: 'notification set off',
        });
    }
}
export default UsersClass;
