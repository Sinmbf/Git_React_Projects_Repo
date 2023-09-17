import { ToDoItem } from "./ToDoItem";

export function ToDoList({ todos, toggleToDos, deleteToDos }) {
  return (
    <div className="row justify-content-center">
      <div className="col-11 col-md-6">
        <h1 className="text-center text-warning mt-5">Todo Activities</h1>
        <ul className="row list-group mt-5 fs-4">
          {todos.length === 0 && (
            <div className="alert alert-danger" role="alert">
              No ToDos!
            </div>
          )}
          {todos.map((todo) => {
            return (
              <ToDoItem
                {...todo}
                key={todo.id}
                toggleToDos={toggleToDos}
                deleteToDos={deleteToDos}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}
