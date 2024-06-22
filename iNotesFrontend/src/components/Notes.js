import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNotes from "./AddNotes";
import { useNavigate } from "react-router-dom";

export default function Notes() {
  let navigate=useNavigate()
  const context = useContext(NoteContext);
  const { notes, getNotes,editNote } = context;
  const refOpen = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({_id:"", title: "", description: "", tag: "" });
  const updateNote = (currentNote) => {
    refOpen.current.click();
    setNote(currentNote);
  };
  const handleClick = (e) => {
    console.log(note)
    editNote(note._id,note.title,note.description,note.tag);
    e.preventDefault();
    refClose.current.click();
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if(localStorage.getItem('token')) getNotes();
    else navigate('/login')
    //eslint-disable-next-line
  }, []);
  return (
    <>
      <AddNotes />
      <button
        type="button"
        ref={refOpen}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
           <div className="container  d-flex justify-content-center my-2"><h5>Edit Note</h5></div> 
            <form className=" container my-3">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  minLength={5}
                  required
                  className="form-control"
                  id="title"
                  onChange={onChange}
                  value={note.title}
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
                  required
                  className="form-control"
                  name="description"
                  onChange={onChange}
                  value={note.description}
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
                  onChange={onChange}
                  value={note.tag}
                  id="tag"
                />
              </div>
            </form>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button type="button" disabled={note.title.length<5||note.description.length<5} onClick={handleClick} className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h3>Your Notes</h3>
        
        {notes.length===0 ?<div className="container">No notes to display</div>:
        notes.map((note, i) => {
          return (
            <NoteItem  key={note._id} note={note} updateNote={updateNote} />
          );
        })}
      </div>
    </>
  );
}
