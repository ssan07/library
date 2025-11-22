import express from "express";
import {getBooks,createBook,updateBook,deleteBook} from "../controllers/bookController.js";
import { verifyToken,checkPermission } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getBooks);
router.post("/", verifyToken, checkPermission, createBook);
router.put("/:id", verifyToken, checkPermission, updateBook);
router.delete("/:id", verifyToken, checkPermission, deleteBook);    

export default router;