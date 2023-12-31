import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
export default function AddNotes() {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
  };
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <h1 className="container my-3">Welcome </h1>
      <h3>Add a Note</h3>
      <form className=" container my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            minLength={5}
            value={note.title}
            required
            className="form-control"
            id="title"
            onChange={onChange}
            name="title"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            minLength={5}
            value={note.description}
            required
            className="form-control"
            name="description"
            onChange={onChange}
            id="description"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            name="tag"
            value={note.tag}
            onChange={onChange}
            id="tag"
          />
        </div>
        <button disabled={note.title.length<5||note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>
          Add Note
        </button>
      </form>
    </div>
  );
}
