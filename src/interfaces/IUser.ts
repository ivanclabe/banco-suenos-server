import IAccount from './IAccount';

export default interface IUser {
  identification: string;
  hashedPassword: string;
  firstname: string;
  lastname: string;
  account?: (IAccount | string)[];
  lastLogin: Date;
  dateJoined: Date;
}
