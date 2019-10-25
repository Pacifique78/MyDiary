import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import router from './Server/Routes/Routes';

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (req, res) => res.send('WELCOME TO FREE MENTORS'));
app.use(router);
const port = process.env.PORT || 6000;
app.listen(port, console.log(`Listening to port ${port}`));
export default app;
