import  express, { Express } from "express"
import { port } from "./config/config";
import { getLogger } from "./helpers/logger";

const logger = getLogger('SERVER');
const app: Express = express();

app.get('/', (req,res) => {
    res.send('Hello World!');
})

app.listen(port, () => {
    logger.info(`Server is listning ar: ${port}`);
});