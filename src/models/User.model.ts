import { Schema, model, Model, Document } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import IUser from '../interfaces/IUser';
import { TOKEN_SECRET } from '../utils/constants';
import * as messages from '../exceptions/messages';

export interface IUserDocument extends IUser, Document {
  setPassword: (password: string) => Promise<void>;
  checkPassword: (password: string) => Promise<boolean>;
  generateAuthToken(): Promise<string>;
  removeToken(token: string): Promise<void>;
}

export interface IUserModel extends Model<IUserDocument> {
  findByIdentification(identification: string): Promise<IUserDocument>;
  findByToken(token: string): Promise<IUserDocument>;
  findByCredentials(email: string, password: string): Promise<IUserDocument>;
}

const userSchema: Schema<IUserDocument> = new Schema(
  {
    identification: { type: String, unique: true },
    hashedPassword: { type: String, required: true },
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    account: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Account'
      }
    ],
    phone: String,
    tokens: [
      {
        access: {
          type: String,
          required: true
        },
        token: {
          type: String,
          required: true
        }
      }
    ]
  },
  {
    collection: 'users',
    timestamps: {
      createdAt: 'dateJoined',
      updatedAt: 'lastLogin'
    }
  }
);

/**
 * Password hash middleware.
 */
userSchema.pre<IUserDocument>('save', function(next): void {
  if (!this.isModified('hashedPassword')) next();

  bcrypt.genSalt(10, async (err, salt) => {
    if (err) return next(err);

    try {
      const hash = await bcrypt.hash(this.hashedPassword, salt);
      this.hashedPassword = hash;
      next();
    } catch (error) {
      next(err);
    }
  });
});

userSchema.methods.setPassword = async function(
  password: string
): Promise<void> {
  const hash = await bcrypt.hash(password, 10);
  this.hashedPassword = hash;
};

userSchema.methods.checkPassword = async function(
  password: string
): Promise<boolean> {
  const result = await bcrypt.compare(password, this.hashedPassword);
  return result;
};

userSchema.methods.generateAuthToken = async function(): Promise<string> {
  const access = 'auth';
  const token = jwt.sign({ _id: this._id.toHexString(), access }, TOKEN_SECRET);

  this.tokens.push({ access, token });
  await this.save();

  return token;
};

userSchema.methods.removeToken = async function(token: string): Promise<void> {
  return await this.update({
    $pull: { tokens: { token } }
  });
};

// Functions on user collection
userSchema.statics.findByToken = async function(
  token: string
): Promise<IUserDocument | null> {
  const decoded = jwt.verify(token, TOKEN_SECRET);

  return await this.findOne({
    _id: decoded,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

userSchema.statics.findByCredentials = async function(
  identification: string,
  password: string
): Promise<IUserDocument | null> {
  const user: IUserDocument | null = this.findOne({ identification });

  if (!user) throw new Error(messages.NOT_FOUND('identification'));
  if (!user.checkPassword(password)) throw new Error(messages.WRONG_PASSWORD);

  return user;
};

userSchema.statics.findByIdentification = async function(
  identification: string
): Promise<IUserDocument> {
  return await this.findOne({ identification });
};

const User = model<IUserDocument, IUserModel>('User', userSchema);

export default User;
