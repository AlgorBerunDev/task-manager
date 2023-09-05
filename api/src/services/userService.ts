import { IUser, Role, User, UserRole } from "../models/User";

export default {
  async getUserRoles(userId: string): Promise<String[]> {
    const user = await User.findById(userId);
    return user?.roles || [];
  },

  async hasRole(userId: string, role: UserRole): Promise<boolean> {
    const user = await User.findById(userId);
    return user?.roles.includes(Role[role]) || false;
  },
};
