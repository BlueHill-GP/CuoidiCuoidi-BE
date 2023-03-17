import { string } from 'joi';
import mongoose, { Schema, Model } from 'mongoose';

export interface IWorkingTime {
  userId: string;
  serviceId: string;
  time: string;
}

const workingTimeSchema: Schema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  serviceId: {
    type: Schema.Types.ObjectId,
    ref: 'servicePackages',
    required: true,
  },

  time: {
    type: String,
    default: false,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const WorkingTime: Model<IWorkingTime> = mongoose.model<IWorkingTime>(
  'workingTimes',
  workingTimeSchema
);

export default WorkingTime;
