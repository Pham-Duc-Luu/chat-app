import express, { Express, Request, Response, Application } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import { json } from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';

config();
// * innitialization
const app: Application = express();
const PORT = process.env.PORT || 5000;
const api_version = process.env.API_VERSION || '/api/v1';

// * middleware
app.use(helmet());
app.use(compression());
app.use(json());
app.use(express.urlencoded({ extended: true })); // support encoded bodies

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

// * api version
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on('unhandledRejection', (error, promise) => {
  console.log(`Logged Error: ${error}`);
  server.close(() => process.exit(1));
});
