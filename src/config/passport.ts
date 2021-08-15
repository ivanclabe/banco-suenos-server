import passport from 'passport';
import passportLocal from 'passport-local';

import AuthService from '../services/auth.service';

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser<any, any>((req, user, done) => {
  done(undefined, user);
});

passport.deserializeUser<string>(AuthService.deserializeUser);

/**
 * Sign in using Identification and Password.
 */
passport.use(
  new LocalStrategy({ usernameField: 'identification' }, AuthService.verifyUser)
);
