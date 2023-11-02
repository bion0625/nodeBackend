import express from "express";
import { login, me, signup } from "../controller/auth.js";

const authRouter = express.Router();

authRouter.route('/signup').post(signup);

authRouter.route('/login').post(login);

authRouter.route('/me').post(me);

export default authRouter;