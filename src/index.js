import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRouter from "./routes/usersRoute.js";
import urlRouter from "./routes/urlRouter.js";
import rankingRouter from "./routes/rankingRouter.js";

dotenv.config();

const app = express();

app.use(json());
app.use(cors());

//routes
app.use(userRouter);
app.use(urlRouter);
app.use(rankingRouter);

const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(chalk.bold.blue(`Server connected on port ${PORT}`))
);
