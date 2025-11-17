import db from "../db.js";

export const getBooks = async (req, res) => {
    try{
        const [rows] = await db.query("SELECT * FROM  books")
        res.status(200).json(rows);
    }catch(err){

        res.status(500).json({error:err.message});
        res.send({error:err.message});
    }
};
export const createBook = async (req, res) => {
    const {title ,author ,year}= req.body; 
    try{
        await db.query("INSERT INTO books (title,author,year) VALUES (?,?,?)",[title,author,year]);
        res.json("Book added!");
    }catch(err){
        res.status(500).json({error:err.message});
        res.send({error:err.message});
    }
};
export const updateBook = async (req, res) => {
    const {id} = req.params;
    const {title ,author ,year}= req.body; 
    try{
        await db.query("UPDATE books SET title=?,author=?,year=? WHERE id=?",[title,author,year,id]);
        res.json("Book updated!");
    }catch(err){
        res.status(500).json({error:err.message});
        res.send({error:err.message});
    }
};
export const deleteBook = async (req, res) => {
    const {id} = req.params;
    try{
        await db.query("DELETE FROM books WHERE id=?",[id]);
        res.json("Book deleted!");
    }catch(err){

        res.status(500).json({error:err.message});
        res.send({error:err.message});
    }
};