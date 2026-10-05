const express = require("express");
const cors = require("cors");
const noteModel = require("./models/note.model");

const app = express();
app.use(cors());

app.use(express.json());

app.post("/api/notes", async (req, res) => {
  const { title, desc } = req.body;

  const note = await noteModel.create({
    title,
    desc,
  });

  res.status(201).json({
    message: "note created successfully",
    note,
  });
});

app.get("/api/notes", async (req, res) => {
  const notes = await noteModel.find();

  res.status(200).json({
    message: "note data fetch successfully",
    notes,
  });
});

app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;

  await noteModel.findByIdAndDelete(id);

  console.log(id);

  res.status(200).json({
    message: "note deleted successfully",
  });
});

app.patch("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { desc } = req.body;
  await noteModel.findByIdAndUpdate(id, { desc });

  res.status(200).json({
    message: "note update successfully",
  });
});

module.exports = app;
