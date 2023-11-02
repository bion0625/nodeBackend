import express from "express";
import { login, signup } from "../controller/auth.js";

const authRouter = express.Router();

authRouter.route('/signup').post(signup);

authRouter.route('/login').post(login);

export default authRouter;