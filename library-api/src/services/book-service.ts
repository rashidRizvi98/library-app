import mongoose from "mongoose";
import { Book, IBook } from "../database/models/book";
import { Pagination } from "../models/pagination";


const createBook = async (payload:IBook) => {
    return Book.create(payload);
}

const findBookById = async (id: string) => {

    const providedBookId = new mongoose.Types.ObjectId(id) 
    return Book.aggregate([
      {
        $match: {
          _id: providedBookId,
        },
      },
      {
        $lookup: {
          from: 'authors',
          localField: 'author',
          foreignField: '_id',
          as: 'author',
        },
      },
      {
        $project: {
          name: 1,
          isbn: 1,
          'author._id': 1,
          'author.firstName': 1,
          'author.lastName': 1,
        },
      },
    ]);
} 

const findAllBooks = async ({ page, size }: Pagination) => {

  const books = await Book.find().sort('name').skip((page-1) * size).limit(size).exec();

  return {
    books,
    totalElements: await Book.countDocuments()
  }
}

const deleteBook = async (id: string) => {
    return Book.findByIdAndDelete(id)
}

const updateBook =async (bookId: string,payload: IBook) => {
    return Book.findByIdAndUpdate(bookId,payload, { new: true });
}

export default { findBookById, findAllBooks, createBook, deleteBook, updateBook };