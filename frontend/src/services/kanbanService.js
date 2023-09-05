import _ from "lodash";
import { sortArrayByNextField } from "../utils/sort";
import taskService from "./taskService";
import taskStatusService from "./taskStatusService";

const kanbanService = {
  async fetchData({ createdBy = null, search = "" }) {
    const tasks = await taskService.fetchAllTasks({ createdBy, search });
    const statuses = await taskStatusService.fetchTaskStatuses();
    return {
      tasks,
      statuses,
    };
  },
  taskToKanbanData(tasks, statuses) {
    const groupedTasks = _.groupBy(tasks, "status");
    const sortedStatuses = sortArrayByNextField(statuses);

    return {
      columns: sortedStatuses.map(status => {
        return {
          ...status,
          cards: sortArrayByNextField(groupedTasks[status.name]),
        };
      }),
    };
  },
  async moveTask({ id, status, prev, next }) {
    return await taskService.moveTask({ id, status, prev, next });
  },
};

export default kanbanService;
