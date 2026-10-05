import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [notes, setnotes] = useState([]);

  axios
    .get("http://localhost:3000/api/notes")

    .then((res) => {
      setnotes(res.data.notes);
    });

  return (
    <>
      <div className="notes">
        {notes.map((note, idx) => {
          return (
            <div className="note" key={idx}>
              <h1>{note.title}</h1>
              <p>{note.desc}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
