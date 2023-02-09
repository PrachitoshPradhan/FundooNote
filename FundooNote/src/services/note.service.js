import Note from '../models/note.model';
import { redisClient } from '../config/redis';


//get all notes
export const getAllNotes = async (userId) => {
    const data = await Note.find({userId: userId});
    //JSON.stringify will convert the json obj to json string so that it can to stored to redis db 
    await redisClient.set("userId", JSON.stringify(data));
    return data;
};

//create new note
export const newNote = async (body) => {
    const data = await Note.create(body);
    await redisClient.del("userId");
    return data;
};

//update single note
export const updateNote = async (_id, body) => {
    const data = await Note.findByIdAndUpdate(
        {
            _id: _id,
            userId: body.userId
        },
            body,
        {
            new: true
        }
    );

    await redisClient.del("userId");
    return data;
};

//delete single note
export const deleteNote = async (id, userId) => {
    await Note.findByIdAndDelete({_id: id, userId: userId});
    await redisClient.del("userId");
    return '';
};

//get single note
export const getNote = async (id, userId) => {
    const data = await Note.findOne({_id: id, userId: userId});
    await redisClient.set("noteId", JSON.stringify(data));
    return data;
};

//trash single note
export const trashNote = async (id, userId) => {
    const note = await getNote(id, userId);
    let data;
    if (note) {
        data = await Note.findByIdAndUpdate(
            {
                _id: id,
                userId: userId
            },
            {
                isTrash: !note.isTrash
            },
            {
                new: true
            }
        );    
    } else {
        data = null;        
    }
    return data;
};

//archive single note
export const archiveNote = async (id, userId) => {
    const note = await getNote(id, userId);
    let data;
    if (note) {
        data = await Note.findByIdAndUpdate(
            {
                _id: id,
                userId: userId
            },
            {
                isArchive: !note.isArchive
            },
            {
                new: true
            }
        );    
    } else {
        data = null;        
    }
    return data;
};


