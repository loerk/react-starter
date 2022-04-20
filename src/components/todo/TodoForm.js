//shortcut rfce
import { useState, useEffect, useRef } from "react";

function TodoForm(props) {
  // shows input if item is on editState
  const [input, setInput] = useState(props.edit ? props.edit.value : "");
  //to focus input fields
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
    });

    setInput("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      {props.edit ? (
        <>
          <input
            className="todo-input edit"
            id="getTaskInput"
            type="text"
            placeholder="Update Task"
            value={input}
            onChange={handleChange}
            ref={inputRef}
          />
          <button className="todo-btn">Update</button>
        </>
      ) : (
        <>
          <input
            className="todo-input"
            id="getTaskInput"
            type="text"
            placeholder="Add Task"
            value={input}
            onChange={handleChange}
            ref={inputRef}
          />
          <button className="todo-btn">Create</button>
        </>
      )}
    </form>
  );
}

export default TodoForm;
