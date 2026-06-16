import {
  mysqlTable,
  varchar,
  int,
  timestamp,
  text,
  serial,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  username: varchar("username", { length: 100 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).default("admin").notNull(),
  picture: varchar("picture", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const projects = mysqlTable("projects", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  image: varchar("image", { length: 500 }),
  link: varchar("link", { length: 500 }).notNull(),
});

export const blogs = mysqlTable("blogs", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  author: varchar("author", { length: 100 }).notNull(),
  content: text("content").notNull(),
  image: varchar("image", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
});
