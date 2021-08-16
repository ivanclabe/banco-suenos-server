import { IUserModel, IUserDocument } from '../models/user.model';
import { IUserDocumentOrNull } from '../Types';

/**
 * @interface IUserRepo
 * @desc Responsible for pulling users from persistence.
 **/

export interface IUserRepo {
  getUserById(id: string): Promise<IUserDocumentOrNull>;
  getUserByIdentificacion(identification: string): Promise<IUserDocument>;
  getUsers(): Promise<IUserDocument[]>;
}

export default class UserRepo implements IUserRepo {
  private readonly model: IUserModel;

  constructor(model: IUserModel) {
    this.model = model;
  }

  async getUserById(id: string): Promise<IUserDocumentOrNull> {
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
