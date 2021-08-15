import { IUserModel, IUserDocument } from '../models/user.model';

/**
 * @interface IUserRepo
 * @desc Responsible for pulling users from persistence.
 **/

export interface IUserRepo {
  getUserById(id: string): Promise<IUserDocument | null>;
  getUserByIdentificacion(identification: string): Promise<IUserDocument>;
  getUsers(): Promise<IUserDocument[]>;
}

export default class UserRepo implements IUserRepo {
  private model: IUserModel;

  constructor(model: IUserModel) {
    this.model = model;
  }

  async getUserById(id: string): Promise<IUserDocument | null> {
    return await this.model.findById(id);
  }

  async getUserByIdentificacion(
    identification: string
  ): Promise<IUserDocument> {
    return await this.model.findByIdentification(identification);
  }

  async getUsers(): Promise<IUserDocument[]> {
    return await this.model.find();
  }
}
