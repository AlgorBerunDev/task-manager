import { http } from "../utils/http";

const taskService = {
  async fetchTasks({ userId: string, page, limit, sortBy, orderBy, filter, search = "" }) {
    const searchParams = new URLSearchParams({
      userId: string,
      page,
      limit,
      sortBy,
      orderBy,
      filter,
      search,
    }).toString();

    const {
      data: { result },
    } = await http.get("/tasks/paginated?" + searchParams.toString());

    return result;
  },

  async fetchAllTasks({ createdBy = null, search = "" }) {
    const searchParams = new URLSearchParams({
      createdBy,
      search,
    }).toString();

    const {
      data: { result },
    } = await http.get("/tasks?" + searchParams.toString());

    return result;
  },

  async createTask({ title, description, status }) {
    const {
      response: { data },
    } = await http.post("/tasks", { title, description, status });
    return data;
  },

  async updateTask(id, { title, description, status }) {
    const {
      response: { data },
    } = await http.put("/tasks/" + id, { title, description, status });

    return data;
  },

  async removeTask(id) {
    const { status } = await http.delete("/tasks/" + id);
    if (status === 200) return true;
    return false;
  },

  async moveTask({ id, status, next, prev }) {
    const {
      data: { result },
    } = await http.post("/tasks/move", { id, status, next, prev });
    return result;
  },
};

export default taskService;
