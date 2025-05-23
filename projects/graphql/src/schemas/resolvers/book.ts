import { BookModel } from "@stores/index";

export const bookResolvers = {
  Query: {
    getBooks: async () => {
      return BookModel.find();
    },
  },
  Book: {
    reviews: (parent: any) => parent.reviews || [],
  },
  Mutation: {
    addBook: async (_: any, { book }: any) => {
      const newBook = new BookModel(book);
      return newBook.save();
    },
    updateBook: async (_: any, { id, book }: any) => {
      return BookModel.findByIdAndUpdate(id, book, { new: true });
    },
    deleteBook: async (_: any, { id }: any) => {
      return BookModel.findByIdAndDelete(id);
    },
  },
};
