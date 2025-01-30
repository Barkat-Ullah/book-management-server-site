import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { productService } from './product.service';

const createProduct = catchAsync(async (req, res) => {
  const productData = req.body;
  const result = await productService.createProductInfoDb(productData);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'Product created successfully',
    data: result,
  });
});

const getAllProducts = catchAsync(async (req, res) => {
  const result = await productService.getProductInfoDb(req?.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Products retrieved successfully',
    data: result,
  });
});

const getProductById = catchAsync(async (req, res) => {
  const productId = req.params.id;
  const result = await productService.getSingleProductInfoDb(productId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Product retrieved successfully',
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const productId = req.params.id;
  const result = await productService.deleteProductInfoDb(productId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Product deleted successfully',
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const productId = req.params.id;
  const result = await productService.updateProductInfoDb(productId, req?.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Product deleted successfully',
    data: result,
  });
});

export const productController = {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
};
