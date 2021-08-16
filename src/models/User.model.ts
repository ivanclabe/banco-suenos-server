import { Schema, model, Model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import IUser from '../interfaces/IUser';

export interface IUserDocument extends IUser, Document {
  setPassword: (password: string) => Promise<void>;
  checkPassword: (password: string) => Promise<boolean>;
}

export interface IUserModel extends Model<IUserDocument> {
  findByIdentification(identification: string): Promise<IUserDocument>;
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

userSchema.statics.findByIdentification = function(
  identification: string
): Promise<IUserDocument> {
  return this.findOne({ identification });
};

/**
 * Password hash middleware.
 */
// userSchema.pre<IUser>('save', function save(next): void {
//   const user = this as IUser;

//   bcrypt.genSalt(10, async (err, salt) => {
//     if (err) {
//       return next(err);
//     }

//     try {
//       const hash = await bcrypt.hash(user.password, salt);
//       user.password = hash;
//       next();
//     } catch (error) {
//       next(err);
//     }
//   });
// });

const User = model<IUserDocument, IUserModel>('User', userSchema);

export default User;
