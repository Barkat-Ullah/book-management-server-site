import { productValidationSchema } from './product.validation';
import express from 'express';
import { productController } from './product.controller';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();
router.delete('/:id',auth(USER_ROLE.admin), productController.deleteProduct);
router.get('/:id', productController.getProductById);
router.get('/', productController.getAllProducts);
router.post('/create-products',auth(USER_ROLE.admin), validateRequest(productValidationSchema), productController.createProduct);
router.put('/:id',auth(USER_ROLE.admin), productController.updateProduct);
export const productRouter = router;
