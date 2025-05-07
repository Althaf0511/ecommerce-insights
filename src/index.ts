import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import dotenv from "dotenv";
import connectDB from "./config/db";
import typeDefs from "./schemas/index";
import resolvers from "./resolvers/index";

dotenv.config();

const app = express();

app.use(express.json());

const startServer = async (): Promise<void> => {
  await connectDB();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use("/graphql", expressMiddleware(server));

  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.info(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
};

startServer();
