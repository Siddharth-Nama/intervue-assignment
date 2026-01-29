import mongoose, { Document, Schema } from 'mongoose';

export interface IOption {
  text: string;
  votes: number;
}

export interface IPoll extends Document {
  question: string;
  options: IOption[];
  duration: number; // in seconds
  isActive: boolean;
  startTime?: Date;
  createdAt: Date;
}

const PollSchema: Schema = new Schema({
  question: { type: String, required: true },
  options: [{
    text: { type: String, required: true },
    votes: { type: Number, default: 0 }
  }],
  duration: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
  startTime: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IPoll>('Poll', PollSchema);
