const express = require("express")
const router = express.Router()

const {
  getNote,
  getNotes,
  createNote,
  deleteNote,
  updateNote
} = require("../controllers/noteController")

const requireAuth = require("../middleware/requireAuth")

router.use(requireAuth) // requires authentication and then calls next. if no authentication then it throws an error


// GET all notes for a class
router.get("/", getNotes)

// GET a note of a specific ID
router.get("/:id", getNote)

// Create a new note
router.post("/make", createNote)

// Delete a note
router.delete("/:id", deleteNote)

// Update a note
router.patch("/:id", updateNote)

module.exports = router
