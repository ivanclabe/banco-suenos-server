import { Router } from 'express';
import User from '../models/User.model';
import UserRepo from '../repositories/user.repo';
import UserController from '../controllers/user.controller';

const router = Router();

const userCtrl = new UserController(new UserRepo(User));

router.route('/').get(async (...args) => {
  return await userCtrl.handleGetUsers(...args);
});

router
  .route('/:user_id')
  .all(function(req, res, next) {
    // runs for all HTTP verbs first
    // think of it as route specific middleware!
    next();
  })
  .get(function(req, res, next) {
    next(new Error('not implemented'));
  })
  .put(function(req, res, next) {
    next(new Error('not implemented'));
  })
  .post(function(req, res, next) {
    next(new Error('not implemented'));
  })
  .delete(function(req, res, next) {
    next(new Error('not implemented'));
  });

export default router;
