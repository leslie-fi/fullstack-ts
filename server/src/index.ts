import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import mikroConfig from './mikro-orm.config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver, PostResolver, UserResolver } from './resolvers/index';

const main = async () => {
  const ORM = await MikroORM.init(mikroConfig);
  await ORM.getMigrator().up();

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: () => ({ em: ORM.em }),
  });

  apolloServer.applyMiddleware({ app });
  app.listen(4000, () =>
    console.log(
      `🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`
    )
  );
};

main().catch((err) => console.error(err));
