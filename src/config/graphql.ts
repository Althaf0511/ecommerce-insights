import { ApolloServer } from '@apollo/server';
import typeDefs from '../schemas/index';
import resolvers from '../resolvers/index';
import { DocumentNode, GraphQLResolveInfo } from 'graphql';
import { IResolvers } from '@graphql-tools/utils';

const createApolloServer = (): ApolloServer<GraphQLResolveInfo> => {
  return new ApolloServer({
    typeDefs: typeDefs as DocumentNode[],
    resolvers: resolvers as IResolvers,
    introspection: true,
  });
};

export default createApolloServer;
