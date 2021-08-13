import passport from 'passport';
import passportLocal from 'passport-local';
import { NativeError } from 'mongoose';

import { User, IUserDocument } from '../models/user.model';

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser<any, any>((req, user, done) => {
  done(undefined, user);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err: NativeError, user: IUserDocument) => done(err, user));
});

/**
 * Sign in using Email and Password.
 */
passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const userFound: any = await User.findOne({
          email: email.toLowerCase()
        });
        if (!userFound) {
          return done('User Not Found', undefined);
        }

        return done(undefined, userFound);
      } catch (error) {
        return done(error);
      }
    }
  )
);
