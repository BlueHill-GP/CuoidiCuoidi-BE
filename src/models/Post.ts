import mongoose, { Schema, Document, Model } from 'mongoose';

interface IPost extends Document {
  title: string;
  description?: string;
  url?: string;
  status?: 'to learn' | 'learning' | 'learned';
  user: Schema.Types.ObjectId;
  createAt: Date;
}

const PostSchema: Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  url: {
    type: String,
  },
  status: {
    type: String,
    enum: ['to learn', 'learning', 'learned'],
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
