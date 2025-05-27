import { IBookService } from "./bookService";

export interface IGraphQLContext {
  dataSources: {
    bookService: IBookService;
  };
}
