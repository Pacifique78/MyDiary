import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
let pool = new Pool();
let connect = '';
switch (process.env.NODE_ENV) {
case 'test':
    connect = process.env.DATABASE_URL2;
    pool = new Pool({
        connectionString: connect,
    });
    break;
default:
    connect = process.env.DATABASE_URL;
    pool = new Pool({
        connectionString: connect,
    });
    break;
}
export default pool;
