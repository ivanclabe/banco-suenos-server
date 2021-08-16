import { Request, Response, NextFunction } from 'express';
import { IUserRepo } from '../repositories/user.repo';

export interface IUserController {
  handleGetUsers(req: Request, res: Response, next: NextFunction): Promise<any>;
}

/**
 * @class UserController
 * @desc Responsible for handling API requests for the
 * /users route.
 **/

export default class UserController implements IUserController {
  private readonly repository: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.repository = userRepo;
  }

  async handleGetUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const users = await this.repository.getUsers();
      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
}
