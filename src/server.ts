import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors';

import { routes } from './routes'

const app = express()

app.use(express.json())
app.use(routes)

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      message: err.message,
    });
  }

  console.log(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(8080, () => console.log('🚀 Server running'))