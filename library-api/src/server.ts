import  express, { Express } from "express";
import cors from 'cors';
import mongoose from 'mongoose';
import { dbConfig, fe_url, port } from "./config/config";
import { getLogger } from "./helpers/logger";

const logger = getLogger('SERVER');
const app: Express = express();

app.get('/', (req,res) => {
    res.send('Hello World!');
})

app.use(cors({
    origin: fe_url
  }));

mongoose.connect(`mongodb://${dbConfig.userName}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.dbName}?authSource=admin`)
.then(result => 
    app.listen(port, () => {
        logger.info(`Server is listning ar: ${port}`);
    })
    )
.catch(err => logger.error(err));
