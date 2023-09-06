import React, { useEffect } from "react";
import TaskBoard from "./TaskBoard";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function TaskList({ createdBy = null }) {
  const history = useHistory();
  const { loading, isBoardInit, tasks, statuses } = useSelector(state => state.board);
  const {
    board: { fetchBoard, moveTask },
  } = useDispatch();

  useEffect(() => {
    fetchBoard({ createdBy });
  }, []);

  const handleMove = ({ id, status, prev, next }) => {
    moveTask({ id, status, prev, next });
  };

  const handleClickCard = card => {
    history.push(`/tasks/update/${card.id}`);
  };

  if (loading || !isBoardInit) return <div>Loading...</div>;

  return <TaskBoard taskList={tasks} columnList={statuses} move={handleMove} onClickCard={handleClickCard} />;
}
