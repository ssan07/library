import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../db.js";

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try{
        const  [user] = await db.query("SELECT * FROM users WHERE username=?", [username]);
        if(user.length > 0){
            return  res.status(400).json({ message: "Username already exists" });
        }
        const  [userEmail] = await db.query("SELECT * FROM users WHERE email=?", [email]);
        if(userEmail.length > 0){
            return  res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [username, email, hashedPassword]);
        res.status(201).json({ message: "User registered successfully" });
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
}
export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const [user] = await db.query("SELECT * FROM users WHERE username=?", [username]);

        if (user.length === 0) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const validPassword = await bcrypt.compare(password, user[0].password);

        if (!validPassword) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign(
            { id: user[0].id, permission: user[0].permission },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
       
        

        return res.status(200).json({
            message: "Login successful",
            permission: user[0].permission,
            token
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
