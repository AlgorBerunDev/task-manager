import { IUser } from "../models/user";

interface SerializedUser {
  id: string;
  username: string;
  roles: String[];
}

export const userSerializer = (user: IUser): SerializedUser => {
  return {
    id: user._id.toString(),
    username: user.username,
    roles: user.roles,
  };
};

export const usersSerializer = (users: IUser[]): SerializedUser[] => {
  return users.map(userSerializer);
};
