import  express, { Express, NextFunction, Request, Response, json } from "express";
import cors from 'cors';
import mongoose from 'mongoose';
import { dbConfig, fe_url, port } from "./config/config";
import { getLogger } from "./helpers/logger";
import { HttpError } from "./helpers/custom-error";
import authorRoute from "./routes/author-route";
import bookRoute from "./routes/book-route";

const logger = getLogger('SERVER');
export const app: Express = express();

app.get('/', (req,res) => {
    res.send('Hello World!');
})

app.use(cors({
    origin: fe_url
  }));

app.use(json());

app.use("/authors", authorRoute);
app.use("/books", bookRoute);

app.use(
    (
        err: Error,
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        if (err instanceof HttpError) {
            res.status(err.statusCode).json({ message: err.message });
        } else {
            res.status(500).json({ message: err.message });
        }
    }
)

mongoose.connect(`mongodb://${dbConfig.userName}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.dbName}?authSource=admin`)
.then(result => {
    logger.info(`Connected to db`);
    app.listen(port, () => {
        logger.info(`Server is listning at: ${port}`);
    })
})
.catch(err => logger.error(err));
