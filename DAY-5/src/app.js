const express = require("express");

const app = express();

app.use(express.json());

const notes = [];

app.post("/notes", (req, res) => {
  notes.push(req.body);

  res.status(201).json({
    message: "Note Created Successfully",
  });
});

app.get("/notes", (req, res) => {
  res.status(200).json({
    notes,
  });
});

app.delete("/notes/:id", (req, res) => {
  delete notes[req.params.id];

  res.status(204).json({
    message: "Note Deleted Successfully",
  });
});

app.patch("/notes/:id", (req, res) => {
  notes[req.params.id].desc = req.body.desc;

  res.status(200).json({
    message: "note update successfully",
  });
});

module.exports = app;
