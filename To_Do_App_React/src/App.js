import { useState, useEffect } from "react";

import "./styles.css";
import { NewToDoForm } from "./NewToDoForm";
import { ToDoList } from "./ToDoList";

export default function App() {
  const [todos, setToDos] = useState(() => {
    const localStorageValue = localStorage.getItem("ITEMS");
    if (localStorageValue == null) return [];
    return JSON.parse(localStorageValue);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  // Helper function to add To Do
  function addToDo(title) {
    setToDos((currentToDos) => {
      return [
        ...currentToDos,
        {
          id: crypto.randomUUID(),
          title,
          completed: false
        }
      ];
    });
  }

  // Helper function to toggleTodo
  function toggleToDos(id, completed) {
    setToDos((currentToDos) => {
      return currentToDos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }
  // Helper funciton to deleteTodos
  function deleteToDos(id) {
    setToDos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }
  return (
    <div className="container">
      <div className="text-center text-info my-5">
        <h1>To Do App</h1>
      </div>
      <NewToDoForm addToDo={addToDo} />
      <ToDoList
        todos={todos}
        toggleToDos={toggleToDos}
        deleteToDos={deleteToDos}
      />
    </div>
  );
}
