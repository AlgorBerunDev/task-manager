import { IUser, User } from "../models/user";

export default {
  async getUserRole(userId: string): Promise<string> {
    const user = await User.findById(userId);
    return user?.role || "";
  },
};
