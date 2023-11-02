import express from "express";
import { config } from "./config.js";
import authRouter from "./router/auth.js";
import { connect } from "./db.js";
import { authMe } from "./middleware/auth.js";

const app = express();

const port = config.PORT;

app.use(express.json());



app.use('/auth', authRouter);
app.use(authMe);

//todo app use router

connect().then(() => {
    console.log(`db connected !`);
    app.listen(port, () => {
        console.log(`server start: http://localhost:${port}`);
    });
});
