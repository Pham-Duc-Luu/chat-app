import { Router } from "express";
import { loginUser } from "../../controller/sign_in.controller";

const router = Router();

router.post("/login", loginUser);

export default router;
