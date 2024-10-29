import express from 'express';
import bookRouter from './book.route';

const mainRouter = express.Router();

mainRouter.use('/book', bookRouter);

export default mainRouter;
