import dotenv from 'dotenv';
import generateToken from '../helpers/generateToken';
import hashPassword from '../helpers/hashPassword';
import { querry } from '../db';

dotenv.config();
class UsersClass {
    async createUser(req, res) {
        try {
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
            const insertQuery = `INSERT INTO users (firstname, lastname, email, password) 
            VALUES ($1, $2, $3, $4) RETURNING *;`;
            const values = [firstName, lastName, email, pass];
            const result = await querry(insertQuery, values);
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
        } catch (error) {
            const message = error.message || 'Unknown error occured';
            res.status(400).json({
                error: {
                    message,
                },
            });
        }
    }
}
const newClass = new UsersClass();
export default newClass;
