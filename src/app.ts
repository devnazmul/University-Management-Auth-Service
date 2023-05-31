import cors from 'cors';
import express, { Application, Request, Response } from 'express';

const app: Application = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(`/`, (req: Request, res: Response) => {
  res.send('server is running....');
});

export default app;
