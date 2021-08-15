import { Request, Response } from 'express';
import { ITransactionRepo } from '../repositories/transaction.repo';

export interface ITransactionController {
  handleGetTransactions(req: Request, res: Response): Promise<Response>;
}

/**
 * @class TransactionController
 * @desc Responsible for handling API requests for the
 * /Transactions route.
 **/

export default class TransactionController implements ITransactionController {
  private readonly repository: ITransactionRepo;

  constructor(transactionRepo: ITransactionRepo) {
    this.repository = transactionRepo;
  }

  async handleGetTransactions(req: Request, res: Response): Promise<Response> {
    const transactions = await this.repository.getTransactions();
    return res.status(200).json({ transactions });
  }
}
