import IBase from './IBase';
import IAccount from './IAccount';

export default interface ITransaction extends IBase {
  amount: number;
  details?: string[];
  originAccount: IAccount | string;
  targetAccount: IAccount | string;
}
