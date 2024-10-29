import { RequestHandler } from 'express';
import { Book } from '../models/book.model';
import z from 'zod';

const createBookBody = z.object({
  title: z.string(),
  author: z.string(),
  description: z.string(),
  year: z.number(),
  coverUrl: z.string().optional(),
  bookUrl: z.string().optional(),
});

const updateBookBody = z.object({
  title: z.string().optional(),
  author: z.string().optional(),
  description: z.string().optional(),
  year: z.number().optional(),
  coverUrl: z.string().optional(),
  bookUrl: z.string().optional(),
});

const createBook: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const parseResult = createBookBody.safeParse(req.body);

    if (!parseResult.success) {
      res.status(400).json({
        msg: 'Invalid Inputs',
        errors: parseResult.error.errors,
      });
      return;
    }

    const body = parseResult.data;

    const book = await Book.create({
      title: body.title,
      author: body.author.toLowerCase(),
      description: body.description,
      year: body.year,
      coverUrl: body.coverUrl,
      bookUrl: body.bookUrl,
    });

    res.status(201).json({
      msg: 'Book added successfully',
      book,
    });
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

const updateBook: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { id } = req.params;
    const parseResult = updateBookBody.safeParse(req.body);

    if (!parseResult.success) {
      res.status(400).json({
        msg: 'Invalid Inputs',
        errors: parseResult.error.errors,
      });
      return;
    }

    const updatedBook = await Book.findByIdAndUpdate(id, parseResult.data, {
      new: true,
    });

    if (!updatedBook) {
      res.status(404).json({
        msg: 'Book not found',
      });
      return;
    }

    res.status(200).json({
      msg: 'Book updated successfully',
      book: updatedBook,
    });
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

const getAllBooks: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const books = await Book.find({});
    res.status(200).json({ books });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

const getBookById: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      res.status(404).json({
        msg: 'Book not found',
      });
      return;
    }

    res.status(200).json({ book });
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

const deleteBook: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      res.status(404).json({
        msg: 'Book not found',
      });
      return;
    }

    res.status(200).json({
      msg: 'Book deleted successfully',
      book: deletedBook,
    });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

export { createBook, updateBook, getAllBooks, getBookById, deleteBook };
