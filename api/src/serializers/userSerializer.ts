import { IUser } from "../models/User";

interface SerializedUser {
  id: string;
  username: string;
  roles: String[];
  createdAt: Date;
  updatedAt: Date;
}

export const userSerializer = (user: IUser): SerializedUser => {
  return {
    id: user._id.toString(),
    username: user.username,
    roles: user.roles,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export const usersSerializer = (users: IUser[]): SerializedUser[] => {
  return users.map(userSerializer);
};
