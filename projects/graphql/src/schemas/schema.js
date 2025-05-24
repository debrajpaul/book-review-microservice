"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = exports.resolvers = void 0;
const graphql_yoga_1 = require("graphql-yoga");
const typeDefs_1 = require("./typeDefs");
const resolvers_1 = require("./resolvers");
exports.resolvers = {
    Query: {
        ...resolvers_1.bookResolvers.Query,
    },
    Mutation: {
        ...resolvers_1.reviewResolvers.Mutation,
        ...resolvers_1.bookResolvers.Mutation,
    },
    Book: {
        ...resolvers_1.bookResolvers.Book,
    },
};
exports.schema = (0, graphql_yoga_1.createSchema)({
    typeDefs: [typeDefs_1.bookTypeDefs, typeDefs_1.reviewTypeDefs],
    resolvers: exports.resolvers,
});
