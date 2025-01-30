import AppError from '../../error/AppError';
import { User } from '../user/user.model';

const deActiveUserFromDB = async (userId: string) => {
  const isUserExists = await User.findById(userId);
  if (!isUserExists) {
    throw new AppError(403, 'User not found');
  }
  const result = await User.findByIdAndUpdate(
    userId,
    { status: 'de-activated' },
    { new: true },
  );
  return result;
};

export const AdminServices = {
  deActiveUserFromDB,
};
