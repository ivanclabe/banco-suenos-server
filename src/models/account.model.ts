import { Schema, model, Document } from 'mongoose';
import IAccount from '../interfaces/IAccount';

export interface IAccountDocument extends IAccount, Document {}

const accountSchema = new Schema<IAccountDocument>(
  {
    number: { type: String, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

export const Account = model<IAccountDocument>('Account', accountSchema);
