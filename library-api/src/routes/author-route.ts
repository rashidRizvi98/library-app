import { Router } from "express";
import { createAuthor, deleteAuthor, findAllAuthors, findAuthor, updateAuthor } from "../controllers/author-controller";
import { authorCreationInputValidator } from "../middlewares/author-input-validator";

const authorRoute = Router();

authorRoute.get("/:id", findAuthor);

authorRoute.get("/", findAllAuthors);

authorRoute.post("/", authorCreationInputValidator(),createAuthor);

authorRoute.put("/", updateAuthor);

authorRoute.delete("/:id", deleteAuthor);

export default authorRoute;