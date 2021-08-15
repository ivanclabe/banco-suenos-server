import { Request, Response } from 'express';
import { IUserRepo } from '../repositories/user.repo';

export interface IUserController {
  handleGetUsers(req: Request, res: Response): Promise<Response>;
}

/**
 * @class UserController
 * @desc Responsible for handling API requests for the
 * /users route.
 **/

export default class UserController implements IUserController {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  async handleGetUsers(req: Request, res: Response): Promise<Response> {
    const users = await this.userRepo.getUsers();
    return res.status(200).json({ users });
  }
}
