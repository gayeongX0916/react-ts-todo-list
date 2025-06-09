import { useTodos } from "../context/TodoContext";
import type { TodosProps } from "../types/TodosProps";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const { state, dispatch } = useTodos();

  const handleEditTodo = (id: number, value: string) => {
    dispatch({
      type: "Edit",
      payload: { id, value },
    });
  };

  const handleDeleteTodo = (id: number) => {
    dispatch({
      type: "Delete",
      payload: id,
    });
  };

  const handleToggle = (id: number) => {
    dispatch({
      type: "Toggle",
      payload: id,
    });
  };

  const renderList = (title: string, items: TodosProps[]) => {
    return (
      <div>
        <h4 className="todo-item-list-title-do">{title}</h4>
        {items.map((todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
            onEdit={handleEditTodo}
            onDelete={handleDeleteTodo}
            onToggle={handleToggle}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="todo-item-list">
      {renderList(
        "할 일",
        state.filter((todo) => !todo.done)
      )}
      {renderList(
        "완료한 항목",
        state.filter((todo) => todo.done)
      )}
    </div>
  );
};

export default TodoList;
