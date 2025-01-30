import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { AdminControllers } from './admin.controller';

const router = express.Router();
router.patch(
  '/users/:userId/de-active',
  auth(USER_ROLE.admin),
  AdminControllers.deActiveUserByAdmin,
);


export const adminRouter = router;
