import { between, desc, eq, lte, sql } from 'drizzle-orm'

import db from '@/db'
import { goalCompletions, goals } from '@/db/schema'

export default async function getWeekSummaryHandler() {
  const firstDayOfWeek = new Date()
  firstDayOfWeek.setDate(firstDayOfWeek.getDate() - firstDayOfWeek.getDay())
  firstDayOfWeek.setHours(0, 0, 0, 0)
  const lastDayOfWeek = new Date(firstDayOfWeek)
  lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6)
  lastDayOfWeek.setHours(23, 59, 59, 999)

  const goalsCreatedUpToThisWeek = db.$with('goals_created_up_to_this_week').as(
    db
      .select({
        id: goals.id,
        title: goals.title,
        desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
        createAt: goals.createdAt,
      })
      .from(goals)
      .where(lte(goals.createdAt, lastDayOfWeek))
  )

  const goalsCompletedThisWeek = db.$with('goals_completed_this_week').as(
    db
      .select({
        goalId: goalCompletions.id,
        title: goals.title,
        completedAt: goalCompletions.createdAt,
        completedOn: sql`DATE(${goalCompletions.createdAt})`.as('completedOn'),
      })
      .from(goalCompletions)
      .innerJoin(goals, eq(goalCompletions.goalId, goals.id))
      .where(between(goalCompletions.createdAt, firstDayOfWeek, lastDayOfWeek))
      .orderBy(desc(goalCompletions.createdAt))
  )

  const goalsCompletedByDay = db.$with('goals_completed_by_day').as(
    db
      .select({
        completedOn: goalsCompletedThisWeek.completedOn,
        completions: sql`
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', ${goalsCompletedThisWeek.goalId},
              'title', ${goalsCompletedThisWeek.title},
              'completedAt', ${goalsCompletedThisWeek.completedAt}
            )
          )
          `.as('completions'),
      })
      .from(goalsCompletedThisWeek)
      .groupBy(goalsCompletedThisWeek.completedOn)
      .orderBy(desc(goalsCompletedThisWeek.completedOn))
  )

  const summary = await db
    .with(goalsCreatedUpToThisWeek, goalsCompletedThisWeek, goalsCompletedByDay)
    .select({
      completed: sql`(SELECT COUNT(*) FROM ${goalsCompletedThisWeek})`.mapWith(
        Number
      ),
      total:
        sql`(SELECT SUM(${goalsCreatedUpToThisWeek.desiredWeeklyFrequency}) FROM ${goalsCreatedUpToThisWeek})`.mapWith(
          Number
        ),
      goalsCompletedByDay: sql`
        JSON_OBJECT_AGG(
          ${goalsCompletedByDay.completedOn},
          ${goalsCompletedByDay.completions}
        )
      `,
    })
    .from(goalsCompletedByDay)

  return { summary }
}
