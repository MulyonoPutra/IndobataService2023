import mongoose, { ConnectOptions } from 'mongoose';

export const ConnectDb = () => {
	mongoose.set('strictQuery', false);
	mongoose.connect(process.env.MONGODB_URL!, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		autoIndex: true,
	} as ConnectOptions);

	mongoose.connection.on('connected', () => {
		console.log('Connected to database successfully ✅');
	});

	mongoose.connection.on('error', (err) => {
		console.log(`Error while connecting to database ❌ :${err}`);
	});

	mongoose.connection.on('disconnected', () => {
		console.log('Mongodb connection disconnected ❌');
	});
};
