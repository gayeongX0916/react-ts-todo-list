import { useEffect, useState } from "react";
import "./App.css";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import type { TodosProps } from "./types/TodosProps";

function App() {
  const [todos, setTodos] = useState<TodosProps[]>(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const handleAddTodo = (value: string) => {
    const newAdd = {
      done: false,
      text: value,
      id: Date.now(),
    };
    setTodos((prev) => [...prev, newAdd]);
  };

  const handleEditTodo = (id: number, value: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text: value } : todo))
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleToggle = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="todo-list">
      <TodoInput onAdd={handleAddTodo} />
      <TodoList
        todos={todos}
        onEdit={handleEditTodo}
        onDelete={handleDeleteTodo}
        onToggle={handleToggle}
      />
    </div>
  );
}

export default App;
