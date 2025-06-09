import { useTodos } from "../context/TodoContext";
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

  return (
    <div className="todo-item-list">
      <h4 className="todo-item-list-title-do">할 일</h4>
      {state
        .filter((todo) => !todo.done)
        .map((todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
            onEdit={handleEditTodo}
            onDelete={handleDeleteTodo}
            onToggle={handleToggle}
          />
        ))}
      <h4 className="todo-item-list-title-done">완료한 항목</h4>
      {state
        .filter((todo) => todo.done)
        .map((todo) => (
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

export default TodoList;
