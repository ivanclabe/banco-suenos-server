import { Router } from 'express';
import User from '../models/User.model';
import UserRepo from '../repositories/user.repo';
import UserController from '../controllers/user.controller';

const router = Router();
const userCtrl = new UserController(new UserRepo(User));

router.route('/').get((req, res) => {
  return userCtrl.handleGetUsers(req, res);
});

export default router;
