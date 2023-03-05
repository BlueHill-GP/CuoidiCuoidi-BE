// import mongoose, { Schema, Document, Model } from 'mongoose';

// interface IPost extends Document {
//   title: string;
//   description?: string;
//   url?: string;
//   status?: 'to learn' | 'learning' | 'learned';
//   user: Schema.Types.ObjectId;
//   createAt: Date;
// }

// const PostSchema: Schema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//   },
//   url: {
//     type: String,
//   },
//   status: {
//     type: String,
//     enum: ['to learn', 'learning', 'learned'],
//   },
//   user: {
//     type: Schema.Types.ObjectId,
//     ref: 'users',
//   },
//   createAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Post: Model<IPost> = mongoose.model<IPost>('posts', PostSchema);

// export default Post;

import { number } from 'joi';
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPost extends Document {
  description: string;
  image: Array<string>;
  like?: Array<string>;
  user: string;
  createAt?: Date;
}

const PostSchema: Schema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  image: {
    type: Array<string>,
    required: true,
  },
  like: {
    type: Array<Schema.Types.ObjectId>,
    default: [],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Post: Model<IPost> = mongoose.model<IPost>('posts', PostSchema);

export default Post;
