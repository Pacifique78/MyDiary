import dotenv from 'dotenv';
import pool from './config';

dotenv.config();
export const querry = async (queryString, values = []) => pool.connect()
    .then(client => client
        .query(queryString, values)
        .then(res => {
            client.release();
            return res.rows;
        }));
export default querry;
