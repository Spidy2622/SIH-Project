import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  ward?: string;
  society?: string;
  registrationDate: string;
  totalScore: number;
  gamesPlayed: number;
  achievements: Array<{ id: string; title: string }>;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  passwordHash: { type: String, required: true },
  ward: String,
  society: String,
  registrationDate: { type: String, default: () => new Date().toISOString() },
  totalScore: { type: Number, default: 0 },
  gamesPlayed: { type: Number, default: 0 },
  achievements: [{ id: String, title: String }]
});

export default mongoose.model<IUser>('User', UserSchema);


