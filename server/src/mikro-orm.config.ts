import { isProduction } from './constants';
import { Post } from './entities/Post';
import { User } from './entities/User';
import { MikroORM } from '@mikro-orm/core';
import path from 'path';

export default {
  entities: [Post, User],
  migrations: {
    path: path.join(__dirname, './migrations'),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  dbName: 'yws_db',
  user: 'leslie',
  type: 'postgresql',
  debug: !isProduction && true,
} as Parameters<typeof MikroORM.init>[0];
