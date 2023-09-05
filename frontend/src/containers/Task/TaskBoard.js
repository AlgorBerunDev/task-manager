import React, { useMemo } from "react";
import KanbanComponent from "../../components/Kanban";
import kanbanService from "../../services/kanbanService";

export default function TaskBoard({ taskList, columnList, move, onClickCard }) {
  const data = useMemo(() => {
    if (!taskList || !columnList) return { columns: [] };

    return kanbanService.taskToKanbanData(taskList, columnList);
  }, [taskList, columnList]);

  const handleMoveTask = ({ movingTask, status, insertAfterTask, insertBeforeTask }) => {
    move({
      id: movingTask.id,
      status,
      prev: insertAfterTask?.id || null,
      next: insertBeforeTask?.id || null,
    });
  };

  return (
    <KanbanComponent data={data} onClickCard={card => console.log("Clicked card", card)} moveTask={handleMoveTask} />
  );
}
