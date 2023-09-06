import { Typography } from "antd";
import React from "react";
import { Draggable } from "react-beautiful-dnd";

const { Title, Paragraph } = Typography;
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
          <Title level={5} style={{ margin: 0 }}>
            {card.title}
          </Title>
          <Paragraph
            ellipsis={{
              rows: 4,
              expandable: false,
            }}
          >
            {card.description}
          </Paragraph>
        </div>
      )}
    </Draggable>
  );
}

export default Card;
