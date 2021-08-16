import IBase from './IBase';
import IUser from './IUser';

export default interface IAccount extends IBase {
  accountNumber: string;
  user: IUser | string;
  type?: string;
  balance: number;
}
