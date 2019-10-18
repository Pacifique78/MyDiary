import express from 'express';
import bodyParser from 'body-parser';
import router from './Server/Routes/Routes';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.get('/', (req, res) => {
    return res.send('WELCOME TO MYDIARY');
});
app.use(router);
const port= process.env.PORT || 6000;
app.listen(port,console.log(`Listening to port ${port}`));
export default app;
