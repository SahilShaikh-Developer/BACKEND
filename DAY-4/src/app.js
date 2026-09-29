const express = require("express");

const app = express();

app.use(express.json());

const notes = [];

app.post("/notes", (req, res) => {
  res.send("note created");
  notes.push(req.body);
  console.log(req.body);
});

app.get("/notes", (req, res) => {
  res.send(notes);
});

app.delete("/notes/:id", (req, res) => {
  delete notes[req.params.id];

  console.log(req.params);

  res.send("User deleted successfully");
});

app.patch("/notes/:id", (req, res) => {
  notes[req.params.id].desc = req.body.desc;

  res.send("note des update successfully");
});

module.exports = app;
