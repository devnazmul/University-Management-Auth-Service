import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';

// STATIC METHODS
// interface userMethods{

// }

// type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser, UserModel>('User', userSchema);
