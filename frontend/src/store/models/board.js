import taskService from "../../services/taskService";
import taskStatusService from "../../services/taskStatusService";
import _ from "lodash";

const board = {
  state: {
    tasks: [],
    statuses: [],
    isBoardInit: false,
    isSavingTask: false,
    loading: false,
  },
  reducers: {
    setBoardReducer(state, { tasks, statuses }) {
      return {
        ...state,
        tasks,
        statuses,
        isBoardInit: true,
      };
    },
    setBoardLoadingReducer(state, loading) {
      return { ...state, loading };
    },
    setStatusSavingTask(state, isSavingTask) {
      return { ...state, isSavingTask };
    },
    unionTasksReducer(state, tasks) {
      return { ...state, tasks: _.unionBy(tasks, state.tasks, "id") };
    },
    updateTasksReducer(state, data) {},
    removeTaskReducer(state, taskId) {
      return { ...state, tasks: state.tasks.filter(task => task.id !== taskId) };
    },
  },
  effects: dispatch => ({
    async fetchBoard({ createdBy = null, search = "" } = {}) {
      dispatch.board.setBoardLoadingReducer(true);
      const tasks = await taskService.fetchAllTasks({ createdBy, search });
      const statuses = await taskStatusService.fetchTaskStatuses();
      dispatch.board.setBoardReducer({ tasks, statuses });
      dispatch.board.setBoardLoadingReducer(false);
    },
    async createTask({ title, description, status }) {
      dispatch.board.setStatusSavingTask(true);
      const { result, updatedTask } = await taskService.createTask({
        title,
        description,
        status,
      });

      dispatch.board.unionTasksReducer([result, updatedTask]);
      dispatch.board.setStatusSavingTask(false);
    },
    async updateTask({ id, title, description, status }) {
      dispatch.board.setStatusSavingTask(true);
      const updatedTasks = await taskService.updateTask(id, {
        title,
        description,
        status,
      });

      dispatch.board.unionTasksReducer(updatedTasks);
      dispatch.board.setStatusSavingTask(false);
    },
    async removeTask(id) {
      dispatch.board.setStatusSavingTask(true);

      const updatedTasks = await taskService.removeTask(id);

      dispatch.board.unionTasksReducer(updatedTasks);
      dispatch.board.removeTaskReducer(id);
      dispatch.board.setStatusSavingTask(false);
    },
    async moveTask({ id, status, next, prev }) {
      const tasks = await taskService.moveTask({ id, status, next, prev });
      dispatch.board.unionTasksReducer(tasks);
    },
  }),
};

export default board;
