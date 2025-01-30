import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();
router.get('/users', UserControllers.getAllUsers);
router.post(
  '/register',
  validateRequest(UserValidation.registerValidationSchema),
  UserControllers.registerUser,
);
router.post(
  '/login',
  validateRequest(UserValidation.logInValidationSchema),
  UserControllers.loginUser,
);
router.post(
  '/users/change-status/:id',
  auth(USER_ROLE.admin),
  UserControllers.changeStatus,
);
router.post(
  '/change-password',
  auth(
    USER_ROLE.admin,
    USER_ROLE.user,
  ),
 UserControllers.changePassword
);
router.patch('/users/:id', UserControllers.updateUser);

export const UserRouter = router;
