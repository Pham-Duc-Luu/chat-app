import { Request, Response, Router } from "express";
import { config } from "dotenv";
import userRouter from "./user.router";
import ApiKey from "../middleware/apikey.middleware";
const appRouter = Router();

// * router
appRouter.get("/", (_, res) => {
  res.send("use");
});

appRouter.use(ApiKey).use("/users", userRouter);
export default appRouter;
