import { NextFunction, Request, RequestHandler, Response } from "express";
import { IAuthor } from "../database/models/author";
import authorService from "../services/author-service";
import { getLogger } from "../helpers/logger";
import { HttpError } from "../helpers/custom-error";
import { validationResult } from "express-validator";

const logger = getLogger('AUTHOR CONTROLLER');

export const createAuthor: RequestHandler =async (req: Request, res: Response, next: NextFunction) => {
    logger.info('createAuthor: ', JSON.stringify(req.body, null, 2));

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        logger.error(errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    const payload: IAuthor = req.body;
    try{
        const author = await authorService.createAuthor(payload);
        return res.status(201)
        .json({ message: "Author was created", data: author });
    } catch(error) {
        return next(error);
    }
}

export const findAuthor: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    logger.info('findAuthorById: ', req.params);
    try {
        const { id } = req.params;
        const author = await authorService.findAuthorById(id);
        if (!author) {
            throw new HttpError(404, "Invalid id");
        }
    
        return res.status(200)
        .json({ data: author });
    } catch (error) {
        return next(error);       
    }
}

export const findAllAuthors: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const authors = await authorService.findAllAuthors();
    
        return res.status(200)
        .json({ data: authors });
    } catch (error) {
        return next(error);       
    }

}

export const deleteAuthor: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
      logger.info('deleteAuthor: ', req.params);

    try {
        const { id } = req.params;
        await authorService.deleteAuthor(id);    
        return res.status(200)
        .json({ message: "Deleted" });
    } catch (error) {
        return next(error);       
    }
}

export const updateAuthor: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    logger.info('updateAuthor: ', JSON.stringify(req.body, null, 2));
    try {
        const payload: IAuthor = req.body;
        const authorId = req.body._id;
        const updatedAuthor = await authorService.updateAuthor(authorId,payload);
    
        return res.status(200)
        .json({ data: updatedAuthor });
    } catch (error) {
        return next(error);       
    }
}