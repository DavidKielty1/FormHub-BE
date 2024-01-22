import express from 'express';
import morgan from 'morgan';
import db from './modules/db';
import { nanoid } from 'nanoid';
export const genId = () => nanoid(16);
import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
import http from 'http';
import schema from './graphql/schema';
import resolvers from './graphql/resolvers';

const app = express();
app.use(morgan('dev')); // logger

app.get('/', async (req, res) => {
  const submissions = await db.submission.findMany();
  res.json(submissions);
});

const startServer = async () => {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });
  await server.start();
  server.applyMiddleware({ app });
  const port = Number(process.env.PORT ?? 8080);
  await new Promise<void>((resolve) =>
    httpServer.listen({ host: '0.0.0.0', port }, resolve)
  );
  console.log(
    `🚀 Server ready at http://localhost:${port}:${server.graphqlPath}`
  );
};
startServer();

// const port = Number(process.env.PORT ?? 8080);
// app.listen(port, '0.0.0.0', () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
