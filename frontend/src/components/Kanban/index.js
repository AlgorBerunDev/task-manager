import React, { useState } from "react";
import Board from "./Board";

const initialData = {
  columns: [
    {
      id: "column-1",
      title: "To Do",
      cards: [
        { id: "card-1", content: "Task 1" },
        { id: "card-2", content: "Task 2" },
      ],
    },
    {
      id: "column-2",
      title: "In Progress",
      cards: [{ id: "card-3", content: "Task 3" }],
    },
    {
      id: "column-3",
      title: "Done",
      cards: [{ id: "card-4", content: "Task 4" }],
    },
  ],
};

function KanbanComponent({
  moveTask = ({ movingTask, status, insertAfterTask, insertBeforeTask }) => {},
  data = initialData,
  onClickCard,
}) {
  const onDragEnd = result => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const startColumn = data.columns.find(col => col.id === source.droppableId);
    const finishColumn = data.columns.find(col => col.id === destination.droppableId);

    if (source.index < destination.index && source.droppableId === destination.droppableId) {
      moveTask({
        movingTask: startColumn.cards[source.index],
        status: finishColumn.name,
        insertAfterTask: finishColumn.cards[destination.index] || null,
        insertBeforeTask: finishColumn.cards[destination.index + 1] || null,
      });
    } else {
      moveTask({
        movingTask: startColumn.cards[source.index],
        status: finishColumn.name,
        insertAfterTask: finishColumn.cards[destination.index - 1] || null,
        insertBeforeTask: finishColumn.cards[destination.index] || null,
      });
    }
  };

  return <Board columns={data.columns} onDragEnd={onDragEnd} onClickCard={onClickCard} />;
}

export default KanbanComponent;
