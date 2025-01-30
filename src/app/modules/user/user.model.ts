import { model, Schema } from 'mongoose';
import { IRegisterUser } from './user.interface';
import { userStatus } from './user.constant';

const userSchema = new Schema<IRegisterUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    status: {
      type: String,
      enum: userStatus,
      default: 'active',
    },
    phone: { type: String, default: 'N/A' },
    address: { type: String, default: 'N/A' },
    city: { type: String, default: 'N/A' },
    image: { type: String, default: 'N/A' },
  },
  {
    timestamps: true,
  },
);

export const User = model<IRegisterUser>('User', userSchema);
