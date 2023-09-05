import { http } from "../utils/http";

const userService = {
  async getProfile() {},
  async getAllUsers() {
    const { data } = await http.get("/users");

    return data;
  },
};

export default userService;
