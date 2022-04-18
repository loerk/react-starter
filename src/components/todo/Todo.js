import React, { useState } from "react";
import TodoForm from "./TodoForm";

import { RiCloseCircleLine } from "react-icons/ri";

import { TiEdit } from "react-icons/ti";

function Todo({ filter, todos, completeTodo, removeTodo, updateTodo }) {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }
  return todos
    .filter((todo) => {
      return (
        filter === "ALL" ||
        (filter === "OPEN" && !todo.isComplete) ||
        (filter === "DONE" && todo.isComplete)
      );
    })
    .map((todo, index) => (
      <div
        className={todo.isComplete ? "todo-row complete" : "todo-row"}
        key={index}
      >
        <div className="todo-item">
          <input
            checked={todo.isComplete}
            type="checkbox"
            key={todo.id}
            onChange={() => completeTodo(todo.id)}
          ></input>
          <label> {todo.text} </label>
        </div>
        <div className="icons">
          <RiCloseCircleLine
            onClick={() => removeTodo(todo.id)}
            className="delete-icon"
          />
          <TiEdit
            onClick={() => setEdit({ id: todo.id, value: todo.text })}
            className="edit-icon"
          />
        </div>
      </div>
    ));
}

export default Todo;
