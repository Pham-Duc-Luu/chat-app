import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import compression from "compression";
import { json } from "body-parser";
import appRouter from "./src/router/index";
import { connectDB } from "./src/database/mongo/connect.mongo";
import morganMiddleware from "./src/middleware/morgan.middleware";
import AppRouter from "./src/router/index";
import AppConfigEnv from "./src/config/app.config";
import swaggerDocs from "./src/util/swagger/swagger";
import authRouter from "./src/router/auth/auth.route";
import deviceDetectorMiddleware from "./src/middleware/deviceDetecto.middleware";
import ngrok from "@ngrok/ngrok";
import QRCode from "qrcode";
dotenv.config();

const app: Application = express();

// * middleware
app.use(helmet());
app.use(compression());
app.use(json());
app.use(morganMiddleware);
app.use(express.urlencoded({ extended: true })); // support encoded bodies
app.use(deviceDetectorMiddleware);
async function main() {
  const server = app.listen(AppConfigEnv.APP_PORT, () => {
    console.log(
      `user server is running at http://localhost:${AppConfigEnv.APP_PORT}`
    );
  });

  app.get("/", (req, res) => {
    res.send("Welcome to our app!");
  });

  app.use(AppConfigEnv.APP_BASE_URL, appRouter);

  swaggerDocs(app, Number(AppConfigEnv.APP_PORT));

  process.on("unhandledRejection", (error, promise) => {
    console.log(`Logged Error: ${error}`);
    server.close(() => process.exit(1));
  });
  // ... you will write your Prisma Client queries here
}

main().then(async () => {
  /**
   * set up ngrok is only for testing and development purposes
   */
  if (AppConfigEnv.ENV === "development") {
    try {
      const listener = await ngrok.forward({
        addr: AppConfigEnv.APP_PORT,
        authtoken: AppConfigEnv.NGROK_AUTHTOKEN,
      });
      const url = listener.url() as string;
      console.log(`Ingress established at: ${url}`);
      QRCode.toFile("public/ngrok.png", url);
    } catch (err) {
      console.error("Error establishing Ngrok tunnel:", err);
    }
  }
});
