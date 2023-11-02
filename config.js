import { configDotenv } from "dotenv";

configDotenv();

const numberParse = (data) => data ? Number(data) : 0;

export const config = {
    PORT: process.env.PORT,
    HASHNUMBER: numberParse(process.env.HASHNUMBER),
    DBURL: process.env.DBURL,
};