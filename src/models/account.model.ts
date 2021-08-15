import { Schema, model, Model, Document } from 'mongoose';
import IAccount from '../interfaces/IAccount';

export interface IAccountDocument extends IAccount, Document {}

export interface IAccountModel extends Model<IAccountDocument> {
  findByNumber(number: string): Promise<IAccountDocument>;
}

const accountSchema: Schema<IAccountDocument> = new Schema(
  {
    number: { type: String, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

accountSchema.statics.findByNumber = function(
  number: string
): Promise<IAccountDocument> {
  return this.findOne({ number });
};

const Account = model<IAccountDocument, IAccountModel>(
  'Account',
  accountSchema
);

export default Account;
