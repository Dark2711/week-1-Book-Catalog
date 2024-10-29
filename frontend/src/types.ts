export interface Book {
  _id: string;
  title: string;
  author: string;
  coverUrl: string;
  description: string;
  year: number;
  bookUrl: string;
}

export type BookFormData = Omit<Book, '_id'>;
// Explanation of Omit<Book, 'id'>:
// Omit<T, K>: This utility type constructs a type by picking all properties from type T and then removing K.
// Book: The original interface from which properties will be omitted.
// 'id': The specific property to exclude from the Book type.