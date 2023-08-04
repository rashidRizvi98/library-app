import { NextFunction, Request, RequestHandler, Response } from "express";
import { IAuthor } from "../database/models/author";
import authorService from "../services/author-service";
import { getLogger } from "../helpers/logger";
import { HttpError } from "../helpers/custom-error";
import { IBook } from "../database/models/book";
import bookService from "../services/book-service";

const logger = getLogger('BOOK CONTROLLER');

export const createBook: RequestHandler =async (req: Request, res: Response, next: NextFunction) => {
    logger.info('createBook: ', JSON.stringify(req.body, null, 2));

    const payload: IBook = req.body;
    try{
        const book = await bookService.createBook(payload);
        return res.status(201)
        .json({ message: "Book was created", data: book });
    } catch(error) {
        return next(error);
    }
}

export const findBook: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    logger.info('findBook: ', req.params);
    try {
        const { id } = req.params;
        const book = await bookService.findBookById(id);
        if (!book) {
            throw new HttpError(404, "Invalid id");
        }
    
        return res.status(200)
        .json({ data: book[0] });
    } catch (error) {
        return next(error);       
    }
}

export const findAllBooks: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const books = await bookService.findAllBooks();
    
        return res.status(200)
        .json({ data: books });
    } catch (error) {
        return next(error);       
    }

}

export const deleteBook: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
      logger.info('deleteBook: ', req.params);

    try {
        const { id } = req.params;
        await bookService.deleteBook(id);    
        return res.status(200)
        .json({ message: "Deleted" });
    } catch (error) {
        return next(error);       
    }
}

export const updateBook: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    logger.info('updateBook: ', JSON.stringify(req.body, null, 2));
    try {
        const payload: IBook = req.body;
        const bookId = req.body._id;
        const updatedBook = await bookService.updateBook(bookId,payload);
    
        return res.status(200)
        .json({ data: updatedBook });
    } catch (error) {
        return next(error);       
    }
}