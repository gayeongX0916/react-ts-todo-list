import TodoItem from "./TodoItem";

const TodoList = () => {
  return (
    <div className="todo-item-list">
      <h4 className="todo-item-list-title-do">할 일</h4>
      <TodoItem />
      <h4 className="todo-item-list-title-done">완료한 항목</h4>
      <TodoItem />
    </div>
  );
};

export default TodoList;
