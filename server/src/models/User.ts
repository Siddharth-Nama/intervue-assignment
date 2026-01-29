import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  role: 'student' | 'teacher';
  socketId?: string;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  role: { type: String, enum: ['student', 'teacher'], required: true },
  socketId: { type: String }, // To map socket connection to user
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IUser>('User', UserSchema);
