import { config } from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';
config();
const app = express();
const PORT = process.env.PORT | 1111;
const hostname = process.env.HOSTNAME | '127.0.0.2';
// * middleware
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies

app.get('/', (req, res) => {
  res.send('Welcome to our app');
});

app.listen(PORT, hostname, (error) => {
  if (!error) console.log('Api gateway have running at port : ' + PORT);
  else console.log("Error occurred, server can't start", error);
});
