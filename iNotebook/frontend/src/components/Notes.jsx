/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AddNote from "./AddNote";
import NoteContext from "../context/NoteContext";
import Alert from "./Alert";
import NoteItem from "./NoteItem";

const Notes = ({ displayAlert }) => {
  const context = useContext(NoteContext);
  const { notes, fetchAllNotes, updateNote } = context;
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const btnRef = useRef();
  // Helper function to handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const { id, etitle, edescription, etag } = note;
    updateNote(id, etitle, edescription, etag);
  };
  // Helper function to handle click
  const handleClick = () => {
    btnRef.current.click();
  };
  // Helper function to change note
  const changeNote = (selectedNote) => {
    setNote({
      id: selectedNote._id,
      etitle: selectedNote.title,
      edescription: selectedNote.description,
      etag: selectedNote.tag,
    });
  };
  // Helper function to handle change
  const handleChange = (e) => {
    setNote((currentNote) => {
      return { ...currentNote, [e.target.name]: e.target.value };
    });
  };
  const navigate = useNavigate();
  useEffect(() => {
    const authToken = localStorage.getItem("auth-token");
    // If the user is note logged in then redirect to login page
    if (!authToken) {
      displayAlert("Login or signup to access our page", "info");
      navigate("/login");
    } else {
      fetchAllNotes();
    }
  }, []);
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="text-center text-light">
            <h2>Add Notes</h2>
          </div>
          {/* Add note */}
          <AddNote />
          {/* Update note */}
          <div>
            {/* Modal */}
            <div
              className="modal fade"
              id="updateModal"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex={-1}
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1
                      className="modal-title fs-5 text-success"
                      id="staticBackdropLabel"
                    >
                      Edit Note
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                      {/* Title */}
                      <div className="mb-3">
                        <label
                          htmlFor="title"
                          className="form-label text-black"
                        >
                          Title
                        </label>
                        <input
                          value={note.etitle}
                          name="etitle"
                          type="text"
                          className="form-control"
                          id="etitle"
                          aria-describedby="titleHelp"
                          minLength={3}
                          required
                          onChange={handleChange}
                        />
                      </div>
                      {/* Description */}
                      <div className="mb-3">
                        <label
                          htmlFor="description"
                          className="form-label text-black"
                        >
                          Description
                        </label>
                        <input
                          value={note.edescription}
                          name="edescription"
                          type="text"
                          className="form-control"
                          id="description"
                          minLength={5}
                          required
                          onChange={handleChange}
                          style={{ padding: ".8rem 0 3rem .8rem" }}
                        />
                      </div>
                      {/* Tag */}
                      <div className="mb-3">
                        <label htmlFor="tag" className="form-label text-black">
                          Tag
                        </label>
                        <input
                          value={note.etag}
                          name="etag"
                          type="text"
                          className="form-control"
                          id="tag"
                          onChange={handleChange}
                        />
                      </div>
                      <button
                        ref={btnRef}
                        type="submit"
                        className="btn btn-primary d-none"
                      >
                        Update note
                      </button>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      disabled={
                        note.etitle.length < 3 || note.edescription.length < 5
                      }
                      onClick={handleClick}
                      type="submit"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                    >
                      Update note
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* User Notes */}
        <div className="row justify-content-center">
          {/* If no notes stored then display an alert */}
          {notes?.length === 0 && (
            <div className="text-center">
              <Alert message="No notes stored" type="danger" />
            </div>
          )}
          {/*  If notes are stored then display them */}
          {notes.map((note) => (
            <NoteItem key={note._id} {...note} changeNote={changeNote} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Notes;
