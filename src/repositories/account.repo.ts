import { IAccountModel, IAccountDocument } from '../models/account.model';

/**
 * @interface IAccountRepo
 * @desc Responsible for pulling accounts from persistence.
 **/

export interface IAccountRepo {
  getAccountById(id: string): Promise<IAccountDocument | null>;
  getAccountByNumber(identification: string): Promise<IAccountDocument>;
  getAccounts(): Promise<IAccountDocument[]>;
}

export default class AccountRepo implements IAccountRepo {
  private readonly model: IAccountModel;

  constructor(model: IAccountModel) {
    this.model = model;
  }

  async getAccountById(id: string): Promise<IAccountDocument | null> {
    return await this.model.findById(id);
  }

  async getAccountByNumber(number: string): Promise<IAccountDocument> {
    return await this.model.findByNumber(number);
  }

  async getAccounts(): Promise<IAccountDocument[]> {
    return await this.model.find();
  }
}
