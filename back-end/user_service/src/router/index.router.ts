import { Request, Response, Router } from "express";
import { config } from "dotenv";
import { User } from "../entity/User";
import AppDataSource from "../database/postgresql/connect.postgresql";
const appRouter = Router();

// * router
appRouter.get("/newUser", async (_, res) => {
    const newUser = new User();
    newUser.email = "example@example.com";
    newUser.password = "123aaa";
    newUser.username = "Luu";

    await AppDataSource.manager.save(newUser);
    return res.json(newUser);
});

appRouter.get("/", (_, res) => {
    res.send("use");
});

export default appRouter;
