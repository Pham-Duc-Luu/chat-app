import { config } from "dotenv";
import express from "express";

config();
const app = express();
const PORT = process.env.PORT | 1111;
const hostname = process.env.HOSTNAME | "127.0.0.2";
// const

app.listen(PORT, hostname, (error) => {
    if (!error) console.log("Api gateway have running at port : " + PORT);
    else console.log("Error occurred, server can't start", error);
});
