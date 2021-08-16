import IAccount from './IAccount';

type token = {
  access: string;
  token: string;
};

export default interface IUser {
  identification: string;
  hashedPassword: string;
  firstname: string;
  lastname: string;
  account?: (IAccount | string)[];
  phone?: string;
  tokens: token[];
  lastLogin: Date;
  dateJoined: Date;
}
