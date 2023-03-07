import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUserInfo extends Document {
    userId: string;
    address: string;
    gender: 'male'| 'female'| 'another'
    avatar: string;
    age: number;
 
  createAt?: Date;
}

const UserInfoSchema: Schema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    },
    
  address: {
    type: String,
  },
  gender: {
      type: String,
      enum: ['male', 'female', 'another'],
  },
  avatar: {
    type: String,

  },
  age: {
    type: Number,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const UserInfo: Model<IUserInfo> = mongoose.model<IUserInfo>('userInfos', UserInfoSchema);

export default UserInfo;
