import {
  ITransactionModel,
  ITransactionDocument
} from '../models/transaction.model';
import { ITransactionDocumentOrNull } from '../Types';

/**
 * @interface ITransactionRepo
 * @desc Responsible for pulling Transactions from persistence.
 **/

export interface ITransactionRepo {
  getTransactionById(id: string): Promise<ITransactionDocumentOrNull>;
  getTransactions(): Promise<ITransactionDocument[]>;
}

export default class TransactionRepo implements ITransactionRepo {
  private readonly model: ITransactionModel;

  constructor(model: ITransactionModel) {
    this.model = model;
  }

  async getTransactionById(id: string): Promise<ITransactionDocumentOrNull> {
    return await this.model.findById(id);
  }

  async getTransactions(): Promise<ITransactionDocument[]> {
    return await this.model.find();
  }
}
