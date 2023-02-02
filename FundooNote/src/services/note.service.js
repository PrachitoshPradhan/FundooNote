import Note from '../models/note.model';

//get all notes
export const getAllNotes = async (userId) => {
    const data = await Note.find({userId: userId});
    return data;
};

//create new note
export const newNote = async (body) => {
    const data = await Note.create(body);
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
    return data;
};

//delete single note
export const deleteNote = async (id, userId) => {
    await Note.findByIdAndDelete({_id: id, userId: userId});
    return '';
};

//get single note
export const getNote = async (id, userId) => {
    const data = await Note.findOne({_id: id, userId: userId});
    return data;
};

//archive single note
export const archiveNote = async (id, userId) => {
    console.log("INPUT - note.service -> archiveNote ----->", id, userId);
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
    await redisClient.del('user-'+userId+'-all-notes');
    await redisClient.del('user-'+body.userId+'-note-'+id);
    console.log("OUTPUT - note.service -> archiveNote ----->", data);
    return data;
};

