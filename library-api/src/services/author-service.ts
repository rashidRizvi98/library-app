import { Author, IAuthor } from "../database/models/author";
import { getLogger } from "../helpers/logger";



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

const updateAuthor =async (payload: IAuthor) => {
    return Author.findByIdAndUpdate(payload);
}

export default { findAuthorById, findAllAuthors, createAuthor, deleteAuthor, updateAuthor };