import config from '../../../config';
import { IUser } from './user.interface';
import { User } from './user.model';
import { genarateUserId } from './user.utils';

const createUser = async (user: IUser): Promise<IUser | null> => {
  // AUTO GENARATE INCREMENTAL USER ID
  const id: string = await genarateUserId();
  user.id = id;

  // IF HAVEN"T PASSWORD SET DEFAULT PASSWORD
  if (!user?.password) {
    user.password = config?.DEFAULT_USER_PASS as string;
  }

  // CREATING USER
  const createdUser = await User.create(user);

  // IF USER NOT CREATED
  if (!createdUser) {
    throw new Error('Failed to create user!');
  }

  // IF USER CREATED SUCCESSFULLY
  return createdUser;
};

export const userService = {
  createUser,
};
