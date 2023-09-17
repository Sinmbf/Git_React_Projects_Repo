export function ToDoItem({ completed, id, title, toggleToDos, deleteToDos }) {
  return (
    <li className="list-group-item d-flex justify-content-between">
      <label className="form-check-label d-flex align-items-center">
        <input
          className="form-check-input me-3 border border-2 border-success"
          type="checkbox"
          checked={completed}
          onChange={(e) => toggleToDos(id, e.target.checked)}
        ></input>
        {title}
      </label>
      <button
        onClick={() => deleteToDos(id)}
        className="btn btn-outline-danger mx-3"
      >
        Delete
      </button>
    </li>
  );
}
