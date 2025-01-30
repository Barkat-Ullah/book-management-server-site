import config from '../../config';
import AppError from '../../error/AppError';
import { ILoginUser, IRegisterUser } from './user.interface';
import { User } from './user.model';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';

const registerUserIntoDB = async (payload: IRegisterUser) => {
  const { email, password } = payload;
  const isRegisterUserExists = await User.findOne({ email });
  if (isRegisterUserExists) {
    throw new AppError(401, 'This user is already exists');
  }

  payload.password = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );
  const result = await User.create(payload);
  return result;
};
const loginUserIntoDB = async (payload: ILoginUser) => {
  const { email } = payload;
  const isUserExists = await User.findOne({ email });
  if (!isUserExists) {
    throw new AppError(401, 'This user is not found');
  }

  const { _id, role, status, name, phone, address, city, image } = isUserExists;

  if (status === 'de-active') {
    throw new AppError(401, 'This user is de-activated');
  }

  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    isUserExists?.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(401, 'Password is invalid');
  }

  const user = {
    id: _id,
    role,
    name,
    email: isUserExists?.email,
    phone,
    address,
    city,
    image,
  };

  const accessToken = jwt.sign(user, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in as string,
  });

  return {
    accessToken,
    user,
  };
};

const changeUserStatusFromDB = async (
  id: string,
  payload: { status: string },
) => {
  const result = await User.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const getAllUsersFromDB = async () => {
  const users = await User.find();
  if (!users) {
    throw new AppError(404, 'No users found');
  }
  return users;
};
const updateUserInDB = async (id: string, payload: Record<string, unknown>) => {
  console.log(id)
  const isUserExists = await User.findById(id);
  if (!isUserExists) {
    throw new AppError(404, 'User not found');
  }

  const updatedUser = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return updatedUser;
};


const changePasswordIntoDB = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {

  const user = await User.findById(userData?.id);
  if (!user) {
    throw new AppError(404, 'This user is not found');
  }
 
  const userStatus = user?.status;
  if (userStatus === 'de-active') {
    throw new AppError(404, 'This user is blocked');
  }
  if (!(await bcrypt.compare(payload?.oldPassword, user?.password))) {
    throw new AppError(403, 'This password is not matched');
  }

  const newHashedPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.bcrypt_salt_rounds),
  );
  await User.findOneAndUpdate(
     { _id: userData?.id },
    {
      password: newHashedPassword,
      passwordChangeTime: new Date(),
    },
    {new:true}
  );
  return null;
};

export const UserServices = {
  registerUserIntoDB,
  loginUserIntoDB,
  changeUserStatusFromDB,
  getAllUsersFromDB,
  updateUserInDB,
  changePasswordIntoDB,
};
