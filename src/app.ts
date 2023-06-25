import cors from 'cors';
import express, { Application } from 'express';
import usersRouter from './app/modules/users/user.route';
import globalErrorHandler from './middlewares/globalErrorHandler';
const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use('/api/v1.0/users/', usersRouter);

//Testing
// app.get('/', async (req: Request, res: Response) => {
//   Promise.reject(new Error(`Unhandle Promise Rejection`))
// })

// ERROR HANDLER MIDDLEWARE
app.use(globalErrorHandler);

export default app;
