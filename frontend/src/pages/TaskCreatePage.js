import React, { useEffect } from "react";
import TaskCreate from "../containers/Task/TaskCreate";
import { useDispatch, useSelector } from "react-redux";

export default function TaskCreatePage() {
  const { isBoardInit } = useSelector(state => state.board);

  const {
    board: { fetchBoard },
  } = useDispatch();

  useEffect(() => {
    if (!isBoardInit) fetchBoard();
  }, []);

  if (!isBoardInit) return <p>loading... </p>;

  return (
    <div>
      <h1>Task create page</h1>

      <TaskCreate />
    </div>
  );
}
