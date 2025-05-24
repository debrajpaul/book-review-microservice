"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookResolvers = void 0;
exports.bookResolvers = {
    Query: {
        getBooks: async (_, __, ctx) => {
            return ctx.dataSources.bookService.getAll();
        },
    },
    Book: {
        reviews: (parent) => parent.reviews || [],
    },
    Mutation: {
        addBook: async (_, { book }, ctx) => {
            return await ctx.dataSources.bookService.create(book.title);
        },
        updateBook: async (_, { id, book }, ctx) => {
            return ctx.dataSources.bookService.update(id, book);
        },
        deleteBook: async (_, { id }, ctx) => {
            return ctx.dataSources.bookService.delete(id);
        },
    },
};
