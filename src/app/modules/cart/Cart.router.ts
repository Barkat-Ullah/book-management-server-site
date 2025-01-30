import { Router } from 'express';
import { CartController } from './Cart.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.post(
  '/add',
  auth(USER_ROLE.admin, USER_ROLE.user),
  CartController.addToCart,
);
router.get('/', auth(USER_ROLE.admin, USER_ROLE.user), CartController.getCart);
router.delete(
  '/:cartId/remove/:productId',
  auth(USER_ROLE.admin, USER_ROLE.user),
  CartController.deleteCart,
);
router.delete(
  '/:cartId/clear',
  auth(USER_ROLE.admin, USER_ROLE.user),
  CartController.clearCart, 
);

export const cartRouter = router;
