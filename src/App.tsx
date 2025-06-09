import "./App.css";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { TodosProvider } from "./context/TodoContext";

function App() {
  return (
    <TodosProvider>
      <div className="todo-list">
        <TodoInput />
        <TodoList />
      </div>
    </TodosProvider>
  );
}

export default App;
