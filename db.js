import mongoose from "mongoose";
import { config } from "./config.js";

export const connect = () => mongoose.connect(config.DBURL);