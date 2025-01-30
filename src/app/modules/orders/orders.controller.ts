import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { OrderService } from './orders.service';

const createOrderInfo = catchAsync(async (req, res) => {
  const orderData = req.body;
  const result = await OrderService.createOrder(orderData, req.ip!);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'Order created successfully',
    data: { checkout_url: result },
  });
});

const getOrders = catchAsync(async (req, res) => {
  const order = await OrderService.getOrders();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Orders retrieved successfully',
    data: order,
  });
});
const getUserOrders = catchAsync(async (req, res) => {
  const { userId } = req.params; 
  const orders = await OrderService.getOrdersByUser(userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User orders retrieved successfully',
    data: orders,
  });
});

const verifyPayment = catchAsync(async (req, res) => {
  const order = await OrderService.verifyPayment(
    req?.query?.order_id as string,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Order verified successfully',
    data: order,
  });
});

const updateOrderStatus = catchAsync(async (req, res) => {
  const { order_id } = req.params;
  const { status } = req.body;

  const order = await OrderService.updateOrderStatus(order_id, status);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Order status updated successfully',
    data: order,
  });
});

const deleteOrder = catchAsync(async (req, res) => {
  const { order_id } = req.params;
  await OrderService.deleteOrder(order_id);
  sendResponse(res, {
    statusCode: StatusCodes.NO_CONTENT,
    message: 'Order deleted successfully',
    data:null
  });
});


export const OrderController = {
  createOrderInfo,
  getOrders,
  verifyPayment,
  updateOrderStatus,
  getUserOrders,
  deleteOrder,
};
