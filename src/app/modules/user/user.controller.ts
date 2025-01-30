import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { UserServices } from './user.service';

const registerUser = catchAsync(async (req, res) => {
  const result = await UserServices.registerUserIntoDB(req?.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'User created successfully',
    data: result,
  });
});
const loginUser = catchAsync(async (req, res) => {
  const result = await UserServices.loginUserIntoDB(req?.body);

  sendResponse(res, {
    statusCode: StatusCodes.ACCEPTED,
    status: true,
    message: 'User logged in successfully',
    token: result?.accessToken,
    data: result?.user,
  });
});
const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await UserServices.changeUserStatusFromDB(id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: true,
    message: ' successfully change status',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDB();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Fetched all users successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.updateUserInDB(id, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: ' successfully updated user details',
    data: result,
  });
});
const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;

  const result = await UserServices.changePasswordIntoDB(
    req.user,
    passwordData,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: true,
    message: 'Password is updated successfully!',
    data: result,
  });
});

export const UserControllers = {
  registerUser,
  loginUser,
  updateUser,
  getAllUsers,
  changePassword,
  changeStatus,
};
