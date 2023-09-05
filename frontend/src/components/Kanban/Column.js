import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Card from "./Card";

const ColumnComponent = styled.div`
  margin: 8px;
  width: 250px;
  border: 1px solid lightgrey;
  border-radius: 4px;
  padding: 5px;

  &:hover .empty-card {
    background: #cccccc;
    height: 100%;
  }
`;

function Column({ column, onClickCard }) {
  return (
    <ColumnComponent>
      <h3>{column.title}</h3>
      <Droppable droppableId={column.id}>
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {column.cards.length > 0 ? (
              column.cards.map((card, index) => (
                <Card key={card.id} card={card} index={index} onClick={() => onClickCard(card)} />
              ))
            ) : (
              <div className="empty-card"></div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </ColumnComponent>
  );
}

export default Column;
