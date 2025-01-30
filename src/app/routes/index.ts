import { Router } from 'express';
import { UserRouter } from '../modules/user/user.router';

import { adminRouter } from '../modules/admin/admin.router';
import { productRouter } from '../modules/products/product.router';
import { cartRouter } from '../modules/cart/Cart.router';
import { orderRouter } from '../modules/orders/orders.router';

const router = Router();
const moduleRoutes = [
  {
    path: '/auth',
    routes: UserRouter,
  },
  {
    path: '/admin',
    routes: adminRouter,
  },
  {
    path: '/products',
    routes: productRouter,
  },
  {
    path: '/cart',
    routes: cartRouter,
  },
  {
    path: '/orders',
    routes: orderRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.routes));

export default router;
