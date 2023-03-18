import mongoose, { Model, Schema } from "mongoose";

export  interface IUserSocket {
  userId?:string;
  userSocketId: string;
}

const UserSocketScheme: Schema = new mongoose.Schema({

  userSocketId: {
    type: String,
    required: true,
  }
});

const UserSocket: Model<IUserSocket> = mongoose.model<IUserSocket>(
  'userSockets',
  UserSocketScheme
);

export default UserSocket;