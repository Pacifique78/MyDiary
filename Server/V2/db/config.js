import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
let connect = '';
switch (process.env.NODE_ENV) {
case 'production':
    connect = process.env.DATABASE_URL3;
    break;
case 'test':
    connect = process.env.DATABASE_URL2;
    break;
default:
    connect = process.env.DATABASE_URL;
    break;
}
const pool = new Pool({
    connectionString: connect,
});
export default pool;
