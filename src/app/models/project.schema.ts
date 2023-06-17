import { Schema, model } from 'mongoose';
import { Project } from '../domain/project';

const projectSchema = new Schema<Project>({
	title: {
		type: String,
		required: true,
	},
	images: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
});

export default model<Project>('Project', projectSchema);
