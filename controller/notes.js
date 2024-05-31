import { json } from "express";
import { query } from "../database/db.js";

const getNotes = async(req, res) => {
    try {
        const notes = await query("SELECT * FROM notes");
        return res.status(200).json({msg:"berhasil", data: notes});
    } catch (error) {
        return res.status(400).json({msg:"terjadi kesalahan"});
    }
}               

const addNotes = async(req, res) => {
    const {title, datetime, note} = req.body;
    try { 
        const data = await query("INSERT INTO notes (title, datetime, note) VALUES (?, ?, ?)", [title, datetime, note]);

        return res.status(200).json({msg:"berhasil",})
    } catch (error) {
        return res.status(400).json({msg:"gagal", err: error})
    }
}

const getNotesbyId = async(req, res) => {
    const {id} = req.params;
    try {
        const result = await query("SELECT * FROM notes WHERE id = (?)", [id]);
        return res.status(200).json(result)
    } catch (error) {
        return res.status(400).json({msg:"gagal", err: error})
    }
}

const updateNotes = async(req,res) => {
    const {id} = req.params;
    const {title, datetime, note} = req.body
    try {
        await query("UPDATE notes SET title=?, datetime=?, note=? WHERE id=?", [title, datetime, note, id])
        return res.status(200).json({msg:"berhasil diubah"})
    } catch (error) {
        return res.status(400).json({msg:"gagal diubah"})
    }
} 

const deleteNotes = async(req,res) => {
    const {id} = req.params;
    try {
        await query("DELETE FROM notes WHERE id=?",[id]);
        return res.status(200).json({msg:"berhasil dihapus"})
    } catch (error) {
        return res.status(400).json({msg:"gagal dihapus"})
    }
}
export {getNotes, addNotes, getNotesbyId, updateNotes, deleteNotes};