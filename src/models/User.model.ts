import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export const DOCUMENT_NAME = 'User';
export const COLLECTION_NAME = 'users';

export interface IUserDocument extends Document {
  nit: string;
  password: string;
  firstname: string;
  lastname: string;
}

const userSchema: Schema = new Schema(
  {
    nit: { type: String, unique: true },
    password: String,
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    }
  },
  { timestamps: { createdAt: 'dateJoined', updatedAt: 'lastLogin' } }
);

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
