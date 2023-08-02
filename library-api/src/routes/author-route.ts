import { Router } from "express";
import { createAuthor, deleteAuthor, findAllAuthors, findAuthor, updateAuthor } from "../controllers/author-controller";

const authorRoute = Router();

authorRoute.get("/:id", findAuthor);

authorRoute.get("/", findAllAuthors);

authorRoute.post("/create", createAuthor);

authorRoute.put("/update", updateAuthor);

authorRoute.delete("/:id", deleteAuthor);

export default authorRoute;