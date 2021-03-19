import { MikroORM } from '@mikro-orm/core';
import { Post } from './entities/Post';
import mikroConfig from './mikro-orm.config';

const main = async () => {
  const ORM = await MikroORM.init(mikroConfig);
  await ORM.getMigrator().up();
  // const post = ORM.em.create(Post, { title: `baby's first post` });
  // await ORM.em.persistAndFlush(post);

  const posts = await ORM.em.find(Post, {});
  console.log(posts);
};

main().catch((err) => console.error(err));
