import { Request, Response } from 'express';
import { IUserRepo } from '../repositories/user.repo';

/**
 * @class UserController
 * @desc Responsible for handling API requests for the
 * /user route.
 **/

export default class UserController {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  async handleGetUsers(req: Request, res: Response): Promise<Response> {
    const users = await this.userRepo.getUsers();
    return res.status(200).json({ users });
  }
}
