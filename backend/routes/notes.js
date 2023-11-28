const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");
const Note = require("../models/Notes");
//ROUTE1: GET ALL THE NOTES
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});
//ROUTE2: ADD THE NOTE
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Enter a Valid Title").isLength({ min: 3 }),
    body("description", "Enter a Valid Description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      } else {
        const { title, description, tag } = req.body;
        const note = new Note({
          title,
          description,
          tag,
          user: req.user.id,
        });
        const savedNote = await note.save();
        res.json(savedNote);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
);
//ROUTE3: Update THE NOTE
router.put(
  "/updatenote/:id",
  fetchUser,
  async (req, res) => {
    try {

        const { title, description, tag } = req.body;
        const updatedNote={}
        if(title){updatedNote.title=title};
        if(description){updatedNote.description=description};
        if(tag){updatedNote.tag=tag}
         let getNote = await Note.findById(req.params.id);
        if(!getNote){ return res.status(404).send("Not Found")}
        if(getNote.user.toString()!==req.user.id){
            return res.status(401).send("Not Allowed");
        }
        else{
            getNote = await Note.findByIdAndUpdate(req.params.id,{$set:updatedNote},{new:true});
            res.json(getNote);
        }
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
);
//ROUTE4: DELETE THE NOTE
router.delete(
  "/deletenote/:id",
  fetchUser,
  async (req, res) => {
    try {

        const { title, description, tag } = req.body;
         let getNote = await Note.findById(req.params.id);
        if(!getNote){ return res.status(404).send("Not Found")}
        if(getNote.user.toString()!==req.user.id){
            return res.status(401).send("Not Allowed");
        }
        else{
            getNote = await Note.findByIdAndDelete(req.params.id);
            res.json({"Success":"Note has been deleted"})        }
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
