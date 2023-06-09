import { Schema, model } from 'mongoose';
import { Features } from '../domain/features';

const featuresSchema = new Schema<Features>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export default model<Features>('Features', featuresSchema);
