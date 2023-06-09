import { Schema, model } from 'mongoose';
import { Testimonials } from '../domain/testimonials';

const testimonialSchema = new Schema<Testimonials>({
	name: {
		type: String,
		required: true,
	},
	comment: {
		type: String,
		required: true,
	},
});

export default model<Testimonials>('Testimonials', testimonialSchema);
