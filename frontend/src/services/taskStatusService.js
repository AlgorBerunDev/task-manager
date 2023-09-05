import { http } from "../utils/http";

const taskStatusService = {
  async fetchTaskStatuses() {
    const { data } = await http.get("/task-statuses");
    return data;
  },
  async createTaskStatus() {},
  async updateTaskStatus() {},
  async removeTaskStatus() {},
  async updateNextPrev() {},
};

export default taskStatusService;
