import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { TodosProps } from "../types/TodosProps";

type TodoItemProps = TodosProps & {
  onEdit: (id: number, value: string) => void;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
};

const TodoItem = ({
  id,
  done,
  text,
  onDelete,
  onEdit,
  onToggle,
}: TodoItemProps) => {
  const [newValue, setNewValue] = useState(text);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEditTodo = () => {
    setIsEditing(true);
  };

  const handleEditComplete = () => {
    onEdit(id, newValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onEdit(id, newValue);
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      const input = inputRef.current;
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    }
  });

  return (
    <div className="todo-item">
      <div className="todo-item-left-wrapper">
        <input
          type="checkbox"
          className="todo-input-checkbox"
          checked={done}
          onChange={() => onToggle(id)}
        />
        {isEditing ? (
          <input
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            className="todo-input-new"
            onKeyDown={handleKeyDown}
            ref={inputRef}
          />
        ) : (
          <span className={`todo-input-text ${done ? "text-done" : ""}`}>
            {text}
          </span>
        )}
      </div>
      <div className="todo-item-button-wrapper">
        {isEditing ? (
          <button onClick={handleEditComplete}>완료</button>
        ) : (
          !done && <button onClick={handleEditTodo}>수정</button>
        )}
        <button onClick={() => onDelete(id)}>삭제</button>
      </div>
    </div>
  );
};

export default TodoItem;
