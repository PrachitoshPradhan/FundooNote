import express from 'express';
import * as noteController from '../controllers/note.controller';
import { noteValidator } from '../validators/note.validator';
import { userAuth } from '../middlewares/auth.middleware';


const router = express.Router();

//route to get all notes
router.get('', userAuth,noteController.getAllNotes);

//route to create a new note
router.post('',noteValidator, userAuth , noteController.newNote);

//route to get a single note by their note id
router.get('/:_id', userAuth, noteController.getNote);

//route to update a single note by their note id
router.put('/:_id', noteValidator, userAuth, noteController.updateNote);

//route to delete a single note by their note id
router.delete('/:_id', userAuth, noteController.deleteNote);

//route to archive a single note by their note id
router.put('/:_id/trash', userAuth, noteController.trashNote);

export default router;