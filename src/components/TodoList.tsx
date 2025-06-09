import type { TodosProps } from "../types/TodosProps";
import TodoItem from "./TodoItem";

type TodoListProps = {
  todos: TodosProps[];
  onEdit: (id: number, value: string) => void;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
};

const TodoList = ({ todos, onEdit, onDelete, onToggle }: TodoListProps) => {
  return (
    <div className="todo-item-list">
      <h4 className="todo-item-list-title-do">할 일</h4>
      {todos
        .filter((todo) => !todo.done)
        .map((todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        ))}
      <h4 className="todo-item-list-title-done">완료한 항목</h4>
      {todos
        .filter((todo) => todo.done)
        .map((todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        ))}
    </div>
  );
};

export default TodoList;
