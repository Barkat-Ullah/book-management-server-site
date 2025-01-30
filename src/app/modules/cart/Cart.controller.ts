import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { CartService } from './Cart.service';

const addToCart = catchAsync(async (req, res) => {
  const userId: string = req.user.id;
  const { productId, quantity } = req.body;

  const result = await CartService.addToCart(userId, productId, quantity);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Item added to cart successfully',
    data: result,
  });
});

const getCart = catchAsync(async (req, res) => {
  const userId: string = req.user.id;

  const result = await CartService.getCart(userId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Cart retrieved successfully',
    data: result,
  });
});

const deleteCart = catchAsync(async (req, res): Promise<void> => {
  const cartId: string = req.params.cartId; // Get cartId from params
  const productId: string = req.params.productId; // Get productId from params

  const result = await CartService.removeItemFromCart(cartId, productId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Item removed from cart successfully',
    data: result,
  });
});

const clearCart = catchAsync(async (req, res): Promise<void> => {
  const cartId: string = req.params.cartId; // Get cartId from params

  const result = await CartService.clearCart(cartId); // Call the service method to clear the cart
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Cart cleared successfully',
    data: result,
  });
});

export const CartController = { addToCart, getCart, deleteCart, clearCart };