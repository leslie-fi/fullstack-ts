import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import mikroConfig from './mikro-orm.config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver, PostResolver, UserResolver } from './resolvers/index';
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { isProduction } from './constants';

const main = async () => {
  const ORM = await MikroORM.init(mikroConfig);
  await ORM.getMigrator().up();

  const app = express();

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();

  const { SESSION_SECRET, PORT } = process.env;

  app.use(
    session({
      name: 'qid',
      store: new RedisStore({ client: redisClient, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: 'lax', //csrf
        secure: isProduction, // wont work w/ localhost
      },
      saveUninitialized: false,
      secret: SESSION_SECRET,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ em: ORM.em, req, res }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () =>
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
    )
  );
};

main().catch((err) => console.error(err));
