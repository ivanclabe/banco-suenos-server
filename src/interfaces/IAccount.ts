import IUser from './IUser';

export default interface IAccount {
  accountNumber: string;
  user: IUser | string;
  type: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}
