
import { Pencil, Trash2 } from 'lucide-react';
import { Book } from '../types';

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
}

export function BookCard({ book, onEdit, onDelete }: BookCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <a href={book.bookUrl} target='_blank'>
      <img
        src={book.coverUrl   || `https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&q=80`}
        alt={book.title}
        className="w-full h-48 object-cover"
      />
      </a>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{book.title}</h3>
        <p className="text-gray-600 mb-2">By {book.author}</p>
        <p className="text-sm text-gray-500 mb-4">{book.year}</p>
        <p className="text-gray-700 mb-4 line-clamp-3">{book.description}</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => {
              alert("Not allowed");
              // onEdit(book)

            }}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={() => {
              alert("Not allowed");
              
              // onDelete(book._id)
            }}
            className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}