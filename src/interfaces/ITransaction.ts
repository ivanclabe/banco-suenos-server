import IAccount from './IAccount';

export default interface ITransaction {
  amount: number;
  details?: string[];
  originAccount: IAccount | string;
  targetAccount: IAccount | string;
  createdAt: Date;
  updatedAt: Date;
}
