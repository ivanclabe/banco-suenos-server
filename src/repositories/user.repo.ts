import { User, IUserDocument } from '../models/user.model';

/**
 * @interface IUserRepo
 * @desc Responsible for pulling users from persistence.
 **/

export interface IUserRepo {
  getUsers(): Promise<IUserDocument[]>;
}

export default class UserRepo implements IUserRepo {
  async getUsers(): Promise<IUserDocument[]> {
    return await User.find();
  }
}
