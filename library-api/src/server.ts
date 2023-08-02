import  express, { Express } from "express";
import cors from 'cors';
import { fe_url, port } from "./config/config";
import { getLogger } from "./helpers/logger";

const logger = getLogger('SERVER');
const app: Express = express();

app.get('/', (req,res) => {
    res.send('Hello World!');
})

app.use(cors({
    origin: fe_url
  }));

app.listen(port, () => {
    logger.info(`Server is listning ar: ${port}`);
});