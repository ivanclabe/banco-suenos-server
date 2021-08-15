import { Request, Response } from 'express';
import { IAccountRepo } from '../repositories/account.repo';

export interface IAccountController {
  handleGetAccounts(req: Request, res: Response): Promise<Response>;
}

/**
 * @class AccountController
 * @desc Responsible for handling API requests for the
 * /accounts route.
 **/

export default class AccountController implements IAccountController {
  private accountRepo: IAccountRepo;

  constructor(accountRepo: IAccountRepo) {
    this.accountRepo = accountRepo;
  }

  async handleGetAccounts(req: Request, res: Response): Promise<Response> {
    const accounts = await this.accountRepo.getAccounts();
    return res.status(200).json({ accounts });
  }
}
