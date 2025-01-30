import mongoose, { Schema, Document } from 'mongoose';

interface CartItem {
  productId: mongoose.Types.ObjectId;
  quantity: number;
  image?:string
}

export interface CartDocument extends Document {
  userId: mongoose.Types.ObjectId;
  items: CartItem[];
}

const CartSchema = new Schema<CartDocument>({
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
      },
      quantity: { type: Number, required: true, default: 1 },
      image: {
        type: String,
      },
    },
  ],
});

export const Cart = mongoose.model<CartDocument>('Cart', CartSchema);
