import { IGraphQLContext } from "@abstractions/index";

export const bookResolvers = {
  Query: {
    getBooks: async (_: any, __: any, ctx: IGraphQLContext) => {
      return ctx.dataSources.bookService.getAll();
    },
  },
  Book: {
    reviews: (parent: any) => parent.reviews || [],
  },
  Mutation: {
    addBook: async (_: any, { book }: any, ctx: IGraphQLContext) => {
      return await ctx.dataSources.bookService.create(book.title);
    },
    updateBook: async (_: any, { id, book }: any, ctx: IGraphQLContext) => {
      return ctx.dataSources.bookService.update(id, book);
    },
    deleteBook: async (_: any, { id }: any, ctx: IGraphQLContext) => {
      return ctx.dataSources.bookService.delete(id);
    },
  },
};
