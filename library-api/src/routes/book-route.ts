import { Router } from "express";
import { deleteAuthor, findAllAuthors, findAuthor, updateAuthor } from "../controllers/author-controller";
import { createBook, deleteBook, findAllBooks, findBook, updateBook } from "../controllers/book-controller";

const bookRoute = Router();

bookRoute.get("/:id", findBook);

bookRoute.get("/", findAllBooks);

bookRoute.post("/", createBook);

bookRoute.put("/", updateBook);

bookRoute.delete("/:id", deleteBook);

export default bookRoute;