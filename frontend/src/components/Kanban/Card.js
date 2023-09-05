import React from "react";
import { Draggable } from "react-beautiful-dnd";

function Card({ card, index }) {
  return (
    <Draggable draggableId={card.id} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            userSelect: "none",
            padding: "8px",
            margin: "0 0 8px 0",
            minHeight: "50px",
            backgroundColor: "white",
            border: "1px solid lightgrey",
            borderRadius: "4px",
            ...provided.draggableProps.style,
          }}
        >
          {card.title}
        </div>
      )}
    </Draggable>
  );
}

export default Card;
