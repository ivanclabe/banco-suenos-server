import { IAccountModel, IAccountDocument } from '../models/account.model';
import { IAccountDocumentOrNull } from '../Types';

/**
 * @interface IAccountRepo
 * @desc Responsible for pulling accounts from persistence.
 **/

export interface IAccountRepo {
  getAccountById(id: string): Promise<IAccountDocumentOrNull>;
  getAccountByNumber(identification: string): Promise<IAccountDocument>;
  getAccounts(): Promise<IAccountDocument[]>;
}

export default class AccountRepo implements IAccountRepo {
  private readonly model: IAccountModel;

  constructor(model: IAccountModel) {
    this.model = model;
  }

  async getAccountById(id: string): Promise<IAccountDocumentOrNull> {
    return await this.model.findById(id);
  }

  async getAccountByNumber(number: string): Promise<IAccountDocument> {
    return await this.model.findByNumber(number);
  }

  async getAccounts(): Promise<IAccountDocument[]> {
    return await this.model.find();
  }
}
