import { Schema, model } from 'mongoose';
import { Overview } from '../domain/overview';

const overviewSchema = new Schema<Overview>({
  header: {
    type: String,
    required: true,
  },
  content: {
    paragraph1: {
      type: String,
      required: true,
    },
    paragraph2: {
      type: String,
      required: true,
    },
    paragraph3: {
      type: String,
      required: true,
    },
    paragraph4: {
      type: String,
      required: true,
    },
    paragraph5: {
      type: String,
      required: true,
    },
  },
  images: [{ type: String, required: true }]
});

export default model<Overview>('Overview', overviewSchema);
