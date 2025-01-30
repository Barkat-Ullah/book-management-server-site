import { StatusCodes } from 'http-status-codes';
import AppError from '../../error/AppError';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { AdminServices } from './admin.service';

const deActiveUserByAdmin = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const result = await AdminServices.deActiveUserFromDB(userId);
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'User de-activated successfully',
    data: result,
  });
});

export const AdminControllers = {
  deActiveUserByAdmin,
};
