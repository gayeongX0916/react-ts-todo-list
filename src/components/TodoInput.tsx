import { useState, type KeyboardEvent } from "react";

type TodoInputProps = {
  onAdd: (value: string) => void;
};

const TodoInput = ({ onAdd }: TodoInputProps) => {
  const [value, setValue] = useState("");

  const hanleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  const handleAddTodo = () => {
    onAdd(value);
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
      <button onClick={handleAddTodo}>추가</button>
    </div>
  );
};

export default TodoInput;
