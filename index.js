import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import swaggerUiexpress from 'swagger-ui-express';
import userRoutes from './Server/Routes/userRoutes';
import entryRoutes from './Server/Routes/entryRoutes';
import swagger from './swagger';

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (req, res) => res.status(200).json({ message: 'WELCOME TO MY DIARY' }));
app.use(userRoutes);
app.use(entryRoutes);
app.use('/api/swagger/', swaggerUiexpress.serve, swaggerUiexpress.setup(swagger));
const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening to port ${port}`));
export default app;
