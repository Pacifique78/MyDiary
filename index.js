import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import swaggerUiexpress from 'swagger-ui-express';
import userRoutes from './Server/V1/Routes/userRoutes';
import entryRoutes from './Server/V1/Routes/entryRoutes';
import v2userRoutes from './Server/V2/Routes/userRoutes';
import v2entryRoutes from './Server/V2/Routes/entryRoutes';
import swagger from './swagger';

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (req, res) => res.status(200).json({ message: 'WELCOME TO MY DIARY' }));
app.use(userRoutes);
app.use(entryRoutes);
app.use(v2userRoutes);
app.use(v2entryRoutes);
app.use('/api/swagger/', swaggerUiexpress.serve, swaggerUiexpress.setup(swagger));
app.use((req, res) => res.status(400).json({
    status: 400,
    error: 'The route was not found',
}));
const port = process.env.PORT || 4000;
app.listen(port, console.log(`Listening to port ${port}`));
export default app;
