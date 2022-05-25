import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";

import userRouter from "./routes/user.js";

const port = 4000;
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use("/users", userRouter); //https://localhost:4000/users/signup

const MONGODB_URL =
  "mongodb://hezcode:olorosam70@cluster0-shard-00-00.fkz9w.mongodb.net:27017,cluster0-shard-00-01.fkz9w.mongodb.net:27017,cluster0-shard-00-02.fkz9w.mongodb.net:27017/?ssl=true&replicaSet=atlas-dkj6wl-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`server is currently running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(`An error occured! ${error}`);
  });
