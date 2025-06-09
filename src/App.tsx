import { useEffect, useReducer } from "react";
import "./App.css";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import type { TodosProps } from "./types/TodosProps";

type Action =
  | { type: "Add"; payload: string }
  | { type: "Edit"; payload: { id: number; value: string } }
  | { type: "Delete"; payload: number }
  | { type: "Toggle"; payload: number };

function reducer(state: TodosProps[], action: Action): TodosProps[] {
  switch (action.type) {
    case "Add":
      return [...state, { id: Date.now(), done: false, text: action.payload }];
    case "Edit":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.value }
          : todo
      );
    case "Delete":
      return state.filter((todo) => todo.id !== action.payload);
    case "Toggle":
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, done: !todo.done } : todo
      );
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, [], () => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const handleAddTodo = (value: string) => {
    dispatch({
      type: "Add",
      payload: value,
    });
  };

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

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state));
  }, [state]);

  return (
    <div className="todo-list">
      <TodoInput onAdd={handleAddTodo} />
      <TodoList
        todos={state}
        onEdit={handleEditTodo}
        onDelete={handleDeleteTodo}
        onToggle={handleToggle}
      />
    </div>
  );
}

export default App;
