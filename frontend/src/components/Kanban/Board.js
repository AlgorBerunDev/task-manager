import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";

function Board({ columns, onDragEnd, onClickCard }) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex" }}>
        {columns.map(column => (
          <Column key={column.id} column={column} onClickCard={onClickCard} />
        ))}
      </div>
    </DragDropContext>
  );
}

export default Board;
