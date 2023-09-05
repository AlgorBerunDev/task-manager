import React, { useEffect, useState } from "react";
import KanbanComponent from "../../components/Kanban";
import kanbanService from "../../services/kanbanService";
import TaskBoard from "./TaskBoard";
import taskService from "../../services/taskService";
import _ from "lodash";

export default function TaskList({ createdBy = "64f4856c186ce900a0f536f2" }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    kanbanService.fetchData({ createdBy }).then(({ tasks, statuses }) => {
      setData({ tasks, statuses });
      setLoading(false);
    });
  }, []);

  const handleMove = ({ id, status, prev, next }) => {
    kanbanService.moveTask({ id, status, prev, next }).then(updatedTasks => {
      setData({ ...data, tasks: [..._.unionBy(updatedTasks, data.tasks, "id")] });
    });
  };

  useEffect(() => {
    console.table(data?.tasks.map(task => ({ id: task.id, title: task.title, next: task.next, prev: task.prev })));
  }, [data?.tasks]);

  if (loading || data === null) return <div>Loading...</div>;

  return <TaskBoard taskList={data.tasks} columnList={data.statuses} move={handleMove} />;
}
