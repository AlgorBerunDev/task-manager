import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Card from "./Card";

function Column({ column, onClickCard }) {
  return (
    <div style={{ margin: "8px", width: "250px", border: "1px solid lightgrey", borderRadius: "4px" }}>
      <h3>{column.title}</h3>
      <Droppable droppableId={column.id}>
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {column.cards.map((card, index) => (
              <Card key={card.id} card={card} index={index} onClick={() => onClickCard(card)} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Column;
