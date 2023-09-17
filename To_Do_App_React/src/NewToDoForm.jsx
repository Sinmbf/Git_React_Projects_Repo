import { useState } from "react";

export function NewToDoForm({ addToDo }) {
  const [itemName, setItemName] = useState("");
  const [btnState, setBtnState] = useState(true);

  // Helper function ot handle submit
  function handleSubmit(e) {
    e.preventDefault();
    // if (itemName === "") {
    //   return;
    // }
    addToDo(itemName);
    setItemName("");
    setBtnState(true);
  }
  return (
    <form onSubmit={handleSubmit} className="row justify-content-center">
      <div className="col-md-6">
        <input
          type="text"
          className="form-control"
          placeholder="Add activities"
          value={itemName}
          onChange={(e) => {
            e.target.value ? setBtnState(false) : setBtnState(true);
            setItemName(e.target.value);
          }}
        />
        <button
          disabled={btnState}
          className="btn btn-outline-info w-100 mt-3 text-light"
        >
          Add
        </button>
      </div>
    </form>
  );
}
