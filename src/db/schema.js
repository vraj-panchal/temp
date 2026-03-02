import { pgTable, serial, text, integer, varchar } from 'drizzle-orm/pg-core';

export const students = pgTable('students', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  age: integer('age'),
  course: varchar('course', { length: 255 })
});
