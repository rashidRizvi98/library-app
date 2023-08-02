import  express, { Express, NextFunction, Request, Response } from "express";
import cors from 'cors';
import mongoose from 'mongoose';
import { dbConfig, fe_url, port } from "./config/config";
import { getLogger } from "./helpers/logger";
import { HttpError } from "./helpers/custom-error";

const logger = getLogger('SERVER');
const app: Express = express();

app.get('/', (req,res) => {
    res.send('Hello World!');
})

app.use(cors({
    origin: fe_url
  }));

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
            res.status(500).json({ message: 'Internal server error' });
        }
    }
)

mongoose.connect(`mongodb://${dbConfig.userName}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.dbName}?authSource=admin`)
.then(result => 
    app.listen(port, () => {
        logger.info(`Server is listning ar: ${port}`);
    })
    )
.catch(err => logger.error(err));
