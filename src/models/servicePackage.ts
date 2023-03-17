import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IServicePackage extends Document {
  title: string;
  description: string;
  image: Array<string>;
  star?: Array<Object>;
  user: string;
  price: number;
  location: string;
  createAt?: Date;
}

const ServicePackageSchema: Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: Array<string>,
    required: true,
  },
  star: {
    type: Array<Object>,
    default: [],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const ServicePackage: Model<IServicePackage> = mongoose.model<IServicePackage>(
  'servicePackages',
  ServicePackageSchema
);

export default ServicePackage;
