import { Response, NextFunction } from 'express';
import { IUserRepo } from '../repositories/user.repo';
import { RequestFull } from '../Types';

/**
 * @class AuthMiddleware
 **/

export interface IAuthMiddleware {
  handleGetUsers(
    req: RequestFull,
    res: Response,
    next: NextFunction
  ): Promise<any>;
}

class AuthMiddleware {
  private readonly repository: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.repository = userRepo;
  }

  async isAuthenticate(
    req: RequestFull,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const bearerHeader = req.headers['authorization'];
    if (!bearerHeader) return next('Forbidden');

    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1] || '';

    try {
      const user = await this.repository.getUserByToken(bearerToken);

      if (!user) return next('');

      req.user = user;
      req.token = bearerToken;

      next();
    } catch (error) {
      next(error);
    }
  }
}

export default AuthMiddleware;
