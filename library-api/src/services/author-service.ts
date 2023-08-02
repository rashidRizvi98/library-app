
import { Author, IAuthor } from "../database/models/author";

const createAuthor = async (payload:IAuthor) => {
    return Author.create(payload);
}

const findAuthorById = async (id: string) => {
    return Author.findById(id);
} 

const findAllAuthors = async () => {
    return Author.find();
}

const deleteAuthor = async (id: string) => {
    return Author.findByIdAndDelete(id)
}

const updateAuthor = async (authorId: string, payload: Partial<IAuthor>) => {
    return Author.findByIdAndUpdate(authorId, payload, { new: true });
}

export default { findAuthorById, findAllAuthors, createAuthor, deleteAuthor, updateAuthor };