import express from 'express'
import connectDb from './config/db.js';
import { port } from './config/config.js';
import chalk from 'chalk';
import userRouter from './routes/users.js';
import postRouter from './routes/posts.js';
import cookieParser from 'cookie-parser';

const PORT = port || 3000;
const app = express();
connectDb();

app.use(express.json());
app.use(cookieParser())

app.use('/api/v1/users', userRouter)
app.use('/api/v1/posts', postRouter)




app.listen(PORT, () => {
    console.log(`${chalk.yellow.bold('Server listening on port ')}${chalk.white.bold(PORT)}`);
});