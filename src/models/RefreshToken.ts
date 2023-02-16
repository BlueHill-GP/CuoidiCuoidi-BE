import mongoose, { Schema, Document, Model } from 'mongoose';

interface IRefreshToken extends Document {
  userId: string;
  refreshToken: string;
  createAt: Date;
}

const RefreshTokenSchema: Schema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  refreshToken: {
    type: String,
    required: true,
    unique: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const RefreshToken: Model<IRefreshToken> = mongoose.model<IRefreshToken>(
  'refreshToken',
  RefreshTokenSchema
);

export default RefreshToken;
