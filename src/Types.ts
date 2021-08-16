import { IAccountDocument } from './models/account.model';
import { ITransactionDocument } from './models/transaction.model';
import { IUserDocument } from './models/User.model';

export type StringOrNumber = string | number;

export type IUserDocumentOrNull = IUserDocument | null;

export type IAccountDocumentOrNull = IAccountDocument | null;

export type ITransactionDocumentOrNull = ITransactionDocument | null;
