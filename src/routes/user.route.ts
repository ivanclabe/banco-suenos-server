import { Router } from 'express';
import userController from '../controllers/user.controller';
import UserRepo from '../repositories/user.repo';

const router = Router();
const userCtrl = new userController(new UserRepo());

router.route('/').get((req, res) => {
  return userCtrl.handleGetUsers(req, res);
});

export default router;
