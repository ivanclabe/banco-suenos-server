import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import IUser from '../interfaces/IUser';

export interface IUserDocument extends IUser, Document {}

const userSchema = new Schema<IUserDocument>({
  identification: { type: String, unique: true },
  password: { type: String, required: true },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  account: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Account'
    }
  ]
});

/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next) {
  const user = this as IUserDocument;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, async (err, salt) => {
    if (err) {
      return next(err);
    }

    try {
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
      next();
    } catch (error) {
      next(err);
    }
  });
});

export const User = model<IUserDocument>('User', userSchema);
