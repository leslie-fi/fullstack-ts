import { Migration } from '@mikro-orm/migrations';

export class Migration20210319195209 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table if not exists "post" ("id" serial primary key, "title" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
  }

}
