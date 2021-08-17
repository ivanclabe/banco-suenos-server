import passport from 'passport';
import passportLocal from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User, { IUserDocument } from '../models/User.model';

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser<IUserDocument>(User.serializeUser);
passport.deserializeUser(User.deserializeUser);

/**
 * Sign in using Identification and Password.
 */
passport.use(
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: 'identification',
      passwordField: 'hashedPassword'
    },
    User.authenticate
  )
);

exports.jwtPassport = passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'abc123'
    },
    (payload, done) => {
      console.log('JWT payload: ', payload);
      User.findOne({ _id: payload._id }, (err, user) => {
        if (err) {
          return done(err, false);
        } else if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    }
  )
);
