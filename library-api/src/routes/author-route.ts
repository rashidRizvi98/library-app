import { Router } from "express";
import { createAuthor, deleteAuthor, findAllAuthors, findAuthor, updateAuthor } from "../controllers/author-controller";

const authorRoute = Router();

authorRoute.get("/:id", findAuthor);

authorRoute.get("/", findAllAuthors);

authorRoute.post("/", createAuthor);

authorRoute.put("/", updateAuthor);

authorRoute.delete("/:id", deleteAuthor);

export default authorRoute;