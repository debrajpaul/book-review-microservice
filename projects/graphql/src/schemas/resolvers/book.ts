import { logger } from "@utils/logger";
import { GraphQLError } from "graphql";
import { IGraphQLContext } from "@abstractions/index";
import { BookInputSchema } from "@validation/index";

export const bookResolvers = {
  Query: {
    getBooks: async (_: any, __: any, ctx: IGraphQLContext) => {
      return await ctx.dataSources.bookService.getAll();
    },
  },
  Book: {
    reviews: (parent: any) => parent.reviews || [],
  },
  Mutation: {
    addBook: async (_: any, { book }: any, ctx: IGraphQLContext) => {
      try {
        const parsed = BookInputSchema.safeParse(book);
        if (!parsed.success) {
          logger.error(
            `Invalid book input: ${JSON.stringify(parsed.error.issues)}`,
          );
          throw new GraphQLError("Invalid book input", {
            extensions: {
              code: "BAD_USER_INPUT",
              details: parsed.error.issues,
            },
          });
        }
        return await ctx.dataSources.bookService.create(parsed.data.title);
      } catch (error) {
        logger.error(`Unexpected error: ${(error as Error).message}`);
        throw new GraphQLError("Something went wrong while adding book", {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
            originalMessage: (error as Error).message,
          },
        });
      }
    },
    updateBook: async (_: any, { id, book }: any, ctx: IGraphQLContext) => {
      try {
        const parsed = BookInputSchema.safeParse(book);
        if (!parsed.success) {
          logger.error(
            `Invalid book input: ${JSON.stringify(parsed.error.issues)}`,
          );
          throw new GraphQLError("Invalid book input", {
            extensions: {
              code: "BAD_USER_INPUT",
              details: parsed.error.issues,
            },
          });
        }
        return await ctx.dataSources.bookService.update(id, parsed.data.title);
      } catch (error) {
        logger.error(
          `Failed to update book ${id}: ${(error as Error).message}`,
        );
        throw new GraphQLError("Something went wrong while updating book", {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
            originalMessage: (error as Error).message,
          },
        });
      }
    },
    deleteBook: async (_: any, { id }: any, ctx: IGraphQLContext) => {
      try {
        const deleted = await ctx.dataSources.bookService.delete(id);
        if (!deleted) {
          throw new GraphQLError("Book not found", {
            extensions: {
              code: "NOT_FOUND",
            },
          });
        }
        return deleted;
      } catch (error) {
        logger.error(
          `Failed to delete book ${id}: ${(error as Error).message}`,
        );
        throw new GraphQLError("Failed to delete book", {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
            originalMessage: (error as Error).message,
          },
        });
      }
    },
  },
};
