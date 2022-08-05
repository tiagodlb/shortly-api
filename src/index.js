import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRouter from "./routes/usersRoute.js";

dotenv.config();

const app = express();

app.use(json());
app.use(cors());

//routes
app.use(userRouter);

const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(chalk.bold.blue(`Server connected on port ${PORT}`))
);
