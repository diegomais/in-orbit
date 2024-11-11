import { randomUUID } from 'node:crypto'
import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const goals = pgTable('goals', {
  id: uuid('id')
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  title: text('title').notNull(),
  desiredWeeklyFrequency: integer('desired_weekly_frequency').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})
