import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

const app = express();

const port = process.env.PORT || 3000;

import indexRouter from "./routes/index.js";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

app.use("/", indexRouter);

mongoose
	.connect(process.env.DB_URI)
	.then(
		app.listen(port, () => {
			console.log(`Listening on port ${port}...`);
		}),
	)
	.catch((error) =>
		console.log(`Error while connecting to database: ${error}`),
	);
