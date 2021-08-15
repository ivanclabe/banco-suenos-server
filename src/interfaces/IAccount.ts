import IUser from './IUser';

export default interface IAccount {
  number: string;
  user: IUser | string;
  createdAt: Date;
  updatedAt: Date;
}
