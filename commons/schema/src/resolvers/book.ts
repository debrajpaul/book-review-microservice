import { books } from '../../../stores/src/mockDb';

export const bookResolvers = {
  Query: {
    getBooks: () => books,
  },
  Book: {
    reviews: (parent: any) => parent.reviews,
  },
};
