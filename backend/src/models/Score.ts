import mongoose, { Schema, Document } from 'mongoose';

export interface IScore extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  score: number;
  level: number;
  date: string;
}

const ScoreSchema = new Schema<IScore>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  name: { type: String, required: true },
  score: { type: Number, required: true },
  level: { type: Number, required: true },
  date: { type: String, default: () => new Date().toISOString() }
});

export default mongoose.model<IScore>('Score', ScoreSchema);


