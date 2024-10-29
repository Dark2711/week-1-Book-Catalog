import { useEffect, useState } from 'react';
import { Library, PlusCircle, Search } from 'lucide-react';
import { Book, BookFormData } from './types';
import { BookCard } from './components/BookCard';
import { BookForm } from './components/BookForm';
import axios from 'axios';

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | undefined>();
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/book/');
        console.log(response.data.books); 
        setBooks(response.data.books); 
      } catch (error) {
        console.error('Error fetching books:', error); // Log any error
      }
    };

    fetchBooks();
  }, []); // Empty array means this effect runs only once on mount

  const handleAddBook = async (data: BookFormData) => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/book/', data);
      const newBook = response.data.book; 
      console.log(newBook); 
      setBooks((prevBooks) => [...prevBooks, newBook]); // Append the new book
      setShowForm(false);
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };
  
  

  const handleEditBook = async(data: BookFormData) => {
    if (!editingBook) return;
    console.log(editingBook._id);
    
    try {
      await axios.put(`http://localhost:3000/api/v1/book/${editingBook._id}`, data);
      const updatedBooks = books.map((book) =>
        book._id === editingBook._id ? { ...data, _id: editingBook._id } : book
      );
      setBooks(updatedBooks);
      setEditingBook(undefined);
      setShowForm(false);
    } catch (error) {
      console.error('Error editing book:', error);
      
    }
  };

  const handleDeleteBook = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/book/${id}`);
      setBooks(books.filter((book) => book._id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
      
    }
  };

  const filteredBooks = books.filter((book) => {
    if (!book) return false; 
  
    const titleMatches = book.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const authorMatches = book.author?.toLowerCase().includes(searchQuery.toLowerCase());
    return titleMatches || authorMatches;
  });
  
  

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Library className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Book Catalog</h1>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              <PlusCircle size={20} />
              <span>Add Book</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search books by title or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {books.length === 0 ? (
          <div className="text-center py-12">
            <Library className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No books yet</h3>
            <p className="mt-1 text-gray-500">Get started by adding a new book.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                onEdit={(book) => {
                  setEditingBook(book);
                  setShowForm(true);
                }}
                onDelete={handleDeleteBook}
              />
            ))}
          </div>
        )}
      </main>

      {(showForm || editingBook) && (
        <BookForm
          book={editingBook}
          onSubmit={editingBook ? handleEditBook : handleAddBook}
          onClose={() => {
            setShowForm(false);
            setEditingBook(undefined);
          }}
        />
      )}
    </div>
  );
}

export default App;