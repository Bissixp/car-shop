import express from 'express';
import 'express-async-errors';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware';
import carRouter from './routes/car';

const app = express();
app.use(express.json());
app.use('/cars', carRouter);
app.use(errorHandlerMiddleware);

export default app;
