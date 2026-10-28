// ЗАЧЕМ: единственный источник правды о таблицах. drizzle-kit читает этот файл и генерирует SQL-миграции.
import { index, integer, pgTable, serial, text, timestamp, unique, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const posts = pgTable(
  'posts',
  {
    id: serial('id').primaryKey(),
    authorName: varchar('author_name', { length: 100 }).notNull(),
    content: text('content').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  // Индекс ускоряет сортировку ленты: ORDER BY created_at DESC
  (t) => [index('posts_created_at_idx').on(t.createdAt)],
);

export const comments = pgTable(
  'comments',
  {
    id: serial('id').primaryKey(),
    // FK: комментарий принадлежит посту. ON DELETE CASCADE — удалили пост, удалились и комментарии
    postId: integer('post_id').notNull().references(() => posts.id, { onDelete: 'cascade' }),
    authorName: varchar('author_name', { length: 100 }).notNull(),
    content: text('content').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  // Postgres НЕ создаёт индекс на внешний ключ сам — делаем руками
  (t) => [index('comments_post_id_idx').on(t.postId)],
);

export const likes = pgTable(
  'likes',
  {
    id: serial('id').primaryKey(),
    postId: integer('post_id').notNull().references(() => posts.id, { onDelete: 'cascade' }),
    visitorId: varchar('visitor_id', { length: 36 }).notNull(), // UUID из localStorage браузера
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index('likes_post_id_idx').on(t.postId),
    // Один визитор — один лайк на пост. Защита на уровне БД, а не только кода
    unique('likes_post_visitor_unique').on(t.postId, t.visitorId),
  ],
);

// relations() описывает связи для удобных запросов db.query.posts.findMany({ with: { comments: true } })
export const postsRelations = relations(posts, ({ many }) => ({ comments: many(comments), likes: many(likes) }));
export const commentsRelations = relations(comments, ({ one }) => ({ post: one(posts, { fields: [comments.postId], references: [posts.id] }) }));
export const likesRelations = relations(likes, ({ one }) => ({ post: one(posts, { fields: [likes.postId], references: [posts.id] }) }));

// Типы выводятся из схемы автоматически — руками их писать не нужно
export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
export type Comment = typeof comments.$inferSelect;
