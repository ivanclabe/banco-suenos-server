import { Schema, model, Model, Document } from 'mongoose';
import ITransaction from '../interfaces/ITransaction';

export interface ITransactionDocument extends ITransaction, Document {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ITransactionModel extends Model<ITransactionDocument> {}

const transactionSchema: Schema<ITransactionDocument> = new Schema(
  {
    amount: { type: Number, unique: true },
    details: String,
    originAccount: {
      type: Schema.Types.ObjectId,
      ref: 'Account'
    },
    targetAccount: {
      type: Schema.Types.ObjectId,
      ref: 'Account'
    }
  },
  { collection: 'transactions', timestamps: true }
);

const Transaction = model<ITransactionDocument, ITransactionModel>(
  'Transaction',
  transactionSchema
);

export default Transaction;
