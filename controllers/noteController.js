const mongoose = require("mongoose");
const Note = require("../models/noteModel");



// Get all notes for a user
const getNotes = async (req, res) => {
  try {
    const owner_id = req.user.id;
    const notes = await Note.find({ owner: owner_id }).sort({ updatedAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single note by ID
const getNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create a new note
const createNote = async (req, res) => {
  const { title, description, color } = req.body;
  const owner = req.user.id;
  try {
    const note = new Note({
      title,
      description,
      color,
      owner
    });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an existing note
const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, description, color } = req.body;
  try {
    const note = await Note.findByIdAndUpdate(id, { title, description, color }, { new: true });
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a note
const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findByIdAndDelete(id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote
};
