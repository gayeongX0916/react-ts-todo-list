import { useState, type KeyboardEvent } from "react";
import { useTodos } from "../context/TodoContext";

const TodoInput = () => {
  const { dispatch } = useTodos();
  const [value, setValue] = useState("");

  const handleAddTodo = (value: string) => {
    dispatch({
      type: "Add",
      payload: value,
    });
  };

  const hanleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  const handleAdd = () => {
    handleAddTodo(value);
    setValue("");
  };

  return (
    <div className="todo-input">
      <input
        placeholder="할 일을 입력해주세요"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={hanleKeyDown}
      />
      <button onClick={handleAdd}>추가</button>
    </div>
  );
};

export default TodoInput;
