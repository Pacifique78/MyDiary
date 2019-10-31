import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
const hashedPassword = (password) => bcrypt.hashSync(password, Number(process.env.saltRounds));
export default hashedPassword;
