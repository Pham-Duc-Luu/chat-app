import express from 'express';

import helmet from 'helmet';
import compression from 'compression';
import { json } from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';
import appRouter from './router';

config();
const app = express();
const PORT = process.env.PORT | 1111;
const hostname = process.env.HOSTNAME | '127.0.0.2';
// middleware
app.use(helmet());
app.use(compression());
app.use(json());
app.use(express.urlencoded({ extended: true })); // support encoded bodies

app.use(appRouter);

app.listen(PORT, hostname, (error) => {
  if (!error) console.log('Api gateway have running at port : ' + PORT);
  else console.log("Error occurred, server can't start", error);
});
