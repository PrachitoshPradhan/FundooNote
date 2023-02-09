import express from 'express';
import * as noteController from '../controllers/note.controller';
import { noteValidator } from '../validators/note.validator';
import { userAuth } from '../middlewares/auth.middleware';
import { getAllNotesRedis , getNotesByIdRedis } from '../middlewares/redis.middleware';


const router = express.Router();

//route to get all notes
router.get('', userAuth, getAllNotesRedis, noteController.getAllNotes);

//route to create a new note
router.post('',noteValidator, userAuth , noteController.newNote);

//route to get a single note by their note id
router.get('/:_id', userAuth, getNotesByIdRedis, noteController.getNote);

//route to update a single note by their note id
router.put('/:_id',  userAuth, noteController.updateNote);

//route to delete a single note by their note id
router.delete('/:_id', userAuth, noteController.deleteNote);

//route to archive a single note by their note id
router.put('/:_id/trash', userAuth, noteController.trashNote);

//route to archive a single note by their note id
router.put('/:_id/archive', userAuth, noteController.archiveNote);

export default router;