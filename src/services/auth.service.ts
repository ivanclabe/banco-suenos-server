import User, { IUserDocument } from '../models/user.model';
import UserRepo from '../repositories/user.repo';

const userRepo = new UserRepo(User);

export default class AuthService {
  static async deserializeUser(id: string, done: any): Promise<void> {
    try {
      const decerializedUser: IUserDocument | null = await userRepo.getUserById(
        id
      );
      if (!decerializedUser) {
        return done('User Not Found', null);
      }
      done(null, decerializedUser);
    } catch (error) {
      done(error, null);
    }
  }

  static async verifyUser(
    identification: string,
    password: string,
    done: any
  ): Promise<void> {
    try {
      const userFound: IUserDocument = await User.findByIdentification(
        identification
      );
      if (!userFound) {
        return done(null, false);
      }
      if (!userFound.checkPassword(password)) {
        return done(null, false);
      }
      done(null, userFound);
    } catch (error) {
      done(error);
    }
  }
}
