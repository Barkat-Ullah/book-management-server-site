import QueryBuilder from '../../builder/QueryBuilder';
import { ProductSearchableFields } from './product.constants';
import { TProduct } from './product.interface';
import { Product } from './product.model';

//create product
const createProductInfoDb = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};

const getProductInfoDb = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Product.find(), query)
    .search(ProductSearchableFields)
    .filter()
    .sort()
    .paginate();
  const result = await productQuery.modelQuery.populate('author', 'name');;
  const meta = await productQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleProductInfoDb = async (id: string) => {
  const result = await Product.findById(id).populate('author', 'name');;
  return result;
};

const deleteProductInfoDb = async (id: string) => {
  const result = (await Product.findByIdAndDelete(id)) || {};
  return result;
};

const updateProductInfoDb = async (id: string, payload: Partial<TProduct>) => {
  const result = await Product.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const productService = {
  createProductInfoDb,
  getProductInfoDb,
  getSingleProductInfoDb,
  deleteProductInfoDb,
  updateProductInfoDb,
};
