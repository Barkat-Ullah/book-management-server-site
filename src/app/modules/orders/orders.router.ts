import express from 'express';
import { OrderController } from './orders.controller';

const router = express.Router();

// Existing routes
router.post('/', OrderController.createOrderInfo);
router.get('/', OrderController.getOrders);
router.get('/verify', OrderController.verifyPayment);
router.get('/user/:userId', OrderController.getUserOrders);
router.put('/:order_id', OrderController.updateOrderStatus);  
router.delete('/:order_id', OrderController.deleteOrder);

export const orderRouter = router;
