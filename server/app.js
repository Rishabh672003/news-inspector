import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

const app = express();

const port = process.env.PORT || 3000;

import indexRouter from "./routes/index.js";
import authRouter from "./routes/auth.js";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: [
      "http://localhost:4321",
      "https://news-inspector-cb555.firebaseapp.com",
    ],
    credentials: true,
  }),
);
app.use(cookieParser());

app.use("/api", indexRouter);
app.use("/api/auth", authRouter);

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}...`);
    });
  });
