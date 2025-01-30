import { Cart } from './Cart.model';
import { Types } from 'mongoose';

const addToCart = async (
  userId: string,
  productId: string,
  quantity: number,
) => {
  const userObjectId = new Types.ObjectId(userId);
  const productObjectId = new Types.ObjectId(productId);

  let cart = await Cart.findOne({ userId: userObjectId });
  if (!cart) {
    cart = new Cart({ userId: userObjectId, items: [] });
  }

  const existingItem = cart.items.find((item) =>
    item.productId.equals(productObjectId),
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ productId: productObjectId, quantity });
  }

  return cart.save();
};

const getCart = async (userId: string) => {
  return Cart.findOne({ userId })
    .populate({
      path: 'userId',
      select: 'name email', 
    })
    .populate({
      path: 'items.productId',
      select: 'title price image', 
    });
};


const removeItemFromCart = async (cartId: string, productId: string) => {
  const cart = await Cart.findById(cartId);
  if (!cart) throw new Error('Cart not found');

  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId,
  );

  if (itemIndex !== -1) {
    cart.items.splice(itemIndex, 1);
    await cart.save();
    return cart;
  } else {
    throw new Error('Product not found in cart');
  }
};
const clearCart = async (cartId: string) => {
  const cart = await Cart.findById(cartId);
  if (!cart) throw new Error('Cart not found');

  // Clear all items from the cart
  cart.items = [];
  await cart.save();

  return cart; // Return the updated cart
};

export const CartService = {
  addToCart,
  getCart,
  removeItemFromCart,
  clearCart,
};
