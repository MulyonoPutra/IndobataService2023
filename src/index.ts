import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import routes from './app/routes';
import { ConnectDb } from './config/connect-db';
import { v2 as cloudinary } from 'cloudinary';
import { Environment } from './config/environment';
dotenv.config();

const app: Express = express();

const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(express.urlencoded({ extended: true }));

cloudinary.config({
	cloud_name: Environment.cloudinaryName,
	api_key: Environment.cloudinaryApiKey,
	api_secret: Environment.cloudinaryApiSecret,
	secure: true,
});

app.use((err: any, req: Request, res: Response) => {
	err.status = err.status || 'error';
	err.statusCode = err.statusCode || 500;

	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
	});
});

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
	ConnectDb();
});
