import express from "express";
import dotenv from "dotenv";
import bookRoutes from "./routes/bookRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(express.json());
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Server running...");
});
app.use("/books", bookRoutes);
app.listen(PORT, () => {
  console.log(`Server started on port http://localhost:${PORT}`);
});
