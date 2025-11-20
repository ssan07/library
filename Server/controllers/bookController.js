import db from "../db.js";

export const getBooks = async (req, res) => {
    try{
        const [rows] = await db.query("SELECT * FROM  books")
        res.status(200).json(rows);
    }catch(err){

        res.status(500).json({message:err.message});
        res.send({message:err.message});
    }
};
export const createBook = async (req, res) => {
    const {title ,author ,year}= req.body; 
    try{
        await db.query("INSERT INTO books (title,author,year) VALUES (?,?,?)",[title,author,year]);
        res.status(201).json({ message:"Book added!"});
    }catch(err){
        res.status(500).json({message:err.message});
        res.send({message:err.message});
    }
};
export const updateBook = async (req, res) => {
    const {id} = req.params;
    const {title ,author ,year}= req.body; 
    try{
        await db.query("UPDATE books SET title=?,author=?,year=? WHERE id=?",[title,author,year,id]);
        res.json("Book updated!");
    }catch(err){
        res.status(500).json({message:err.message});
        res.send({message:err.message});
    }
};
export const deleteBook = async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ message: "Invalid book id" });
    }
    try {
        const [result] = await db.query("DELETE FROM books WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Book not found" });
        }
        return res.status(200).json({ message: "Book deleted" });
    } catch (err) {
        console.error("deleteBook error:", err);
        return res.status(500).json({ message: err.message });
    }
};