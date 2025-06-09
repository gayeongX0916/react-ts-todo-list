import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import type { TodosProps } from "../types/TodosProps";

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

const TodosContext = createContext<{
  state: TodosProps[];
  dispatch: React.Dispatch<Action>;
} | null>(null);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, [], () => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state));
  }, [state]);

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodosContext);
  if (!context) throw new Error("useTodos must be used within a TodosProvider");
  return context;
};
