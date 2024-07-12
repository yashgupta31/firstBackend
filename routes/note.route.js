const express= require("express");
const NoteModel= require("../models/note.model");
const UserModel = require("../models/user.model");
const auth = require("../middleware/auth.middleware");

const noteRouter= express.Router();

noteRouter.post('/create', auth, async(req, res)=>{
    let {title, description, status, userId, userName}= req.body;

    try {
        const note= new NoteModel({title, description, status, userId, userName});
    await note.save()
    res.status(200).send('Note Created successfully')
    } catch (error) {
        res.status(404).send("Failed to create note", error)
    }
    
})

noteRouter.get('/all', auth, async(req, res)=>{
    let {userId}= req.body;
    try {
        let notes= await NoteModel.find({userId})
    res.status(200).send(notes)
    } catch (error) {
        res.status(500).send(error)
    }
})

noteRouter.patch('/update/:noteId', async(req, res)=>{
    let {title, description, status, userId, userName}= req.body;
    const {noteId}= req.params;
    try {
        let note= await NoteModel.findOne({_id: noteId});
        if(note.userId== userId){
            await NoteModel.updateOne({ _id: noteId }, { $set: { title, description, status } });
            res.status(200).send("Note Updated successfully");
        }else{
            res.status(401).send("You are not authorize to update this note");
        }  

    } catch (error) {
        res.status(401).send("You are not authorize to update this note", error);
    }
    
})

module.exports= noteRouter