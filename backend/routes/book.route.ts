import express, { Request, Response } from 'express';
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from '../controllers/book.controller'; // Adjust path as necessary

const bookRouter = express.Router();

bookRouter.post('/', createBook);
bookRouter.put('/:id', updateBook);
bookRouter.get('/', getAllBooks);
bookRouter.get('/:id', getBookById);
bookRouter.delete('/:id', deleteBook);

export default bookRouter;
