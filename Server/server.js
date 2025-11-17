import express from "express";
import dotenv from "dotenv";
import bookRoutes from "./routes/bookRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.get("/", (req, res) => {
  res.send("Server running...");
});
app.use("/books", bookRoutes);
app.listen(PORT, () => {
  console.log(`Server started on port http://localhost:${PORT}`);
});
