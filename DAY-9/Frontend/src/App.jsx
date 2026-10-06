import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const App = () => {
  const [notes, setnotes] = useState([]);

  const [editId, seteditId] = useState(null);

  function fetchNotes() {
    axios
      .get("http://localhost:3000/api/notes")

      .then((res) => {
        setnotes(res.data.notes);
      });
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const { title, desc } = e.target.elements;

    console.log(title.value, desc.value);
    if (editId) {
      axios
        .patch("http://localhost:3000/api/notes/" + editId, {
          title: title.value,
          desc: desc.value,
        })
        .then((res) => {
          console.log(res.data);
          fetchNotes();
          seteditId(null);
          e.target.reset();
        });
      return;
    }

    axios
      .post("http://localhost:3000/api/notes", {
        title: title.value,
        desc: desc.value,
      })

      .then((res) => {
        console.log(res.data);
        fetchNotes();
      });
  }

  function handleEditNote(note) {
    seteditId(note._id);

    console.log(note._id);

    document.querySelector('input[name="title"]').value = note.title;
    document.querySelector('input[name="desc"]').value = note.desc;
  }

  function handleDeleteNote(noteId) {
    console.log(noteId);

    axios
      .delete("http://localhost:3000/api/notes/" + noteId)

      .then((res) => {
        console.log(res.data);

        fetchNotes();
      });
  }

  return (
    <>
      <form className="note-create-form" onSubmit={handleSubmit}>
        <input required name="title" type="text" placeholder="Enter title" />
        <input
          required
          name="desc"
          type="text"
          placeholder="Enter description"
        />
        <button> {editId ? "Update Note" : "Create Note"}</button>
      </form>
      <div className="notes">
        {notes.map((note, idx) => {
          return (
            <div className="note" key={idx}>
              <h1>{note.title}</h1>
              <p>{note.desc}</p>
              <button
                onClick={() => {
                  handleEditNote(note);
                }}
              >
                Edit Note
              </button>
              <button
                onClick={() => {
                  handleDeleteNote(note._id);
                }}
              >
                Delete Note
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
