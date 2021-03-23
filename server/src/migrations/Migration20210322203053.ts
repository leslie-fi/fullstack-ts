import { Migration } from '@mikro-orm/migrations';

export class Migration20210322203053 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table if not exists "user" ("id" serial primary key, "username" text not null, "password" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);'
    );
    this.addSql(
      'alter table "user" add constraint "user_username_unique" unique ("username");'
    );
  }
}
