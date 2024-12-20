import { and, asc, between, count, eq, sql } from 'drizzle-orm'

import db from '@/db'
import { goalCompletions, goals } from '@/db/schema'

const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000

function getCurrentWeek(): number {
  const currentDate = new Date()
  const startOfYear = new Date(currentDate.getFullYear(), 0, 1)
  const pastDaysOfYear =
    (currentDate.getTime() - startOfYear.getTime()) / ONE_DAY_IN_MILLISECONDS
  return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7)
}

export default async function listWeekPendingGoalsHandler() {
  const currentYear = new Date().getFullYear()
  const currentWeek = getCurrentWeek()

  const goalsCreatedUpToThisWeek = db.$with('goals_created_up_to_this_week').as(
    db
      .select({
        id: goals.id,
        title: goals.title,
        desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
        createAt: goals.createdAt,
      })
      .from(goals)
      .where(
        and(
          sql`EXTRACT(YEAR FROM ${goals.createdAt}) <= ${currentYear}`,
          sql`EXTRACT(WEEK FROM ${goals.createdAt}) <= ${currentWeek}`
        )
      )
  )

  const startOfWeek = new Date()
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())
  startOfWeek.setHours(0, 0, 0, 0)
  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(endOfWeek.getDate() + 6)
  endOfWeek.setHours(23, 59, 59, 999)

  const goalsCompletionCounts = db.$with('goals_completion_counts').as(
    db
      .select({
        goalId: goalCompletions.goalId,
        completionCount: count(goalCompletions.id).as('completionCount'),
      })
      .from(goalCompletions)
      .where(between(goalCompletions.createdAt, startOfWeek, endOfWeek))
      .groupBy(goalCompletions.goalId)
  )

  const pendingGoals = await db
    .with(goalsCreatedUpToThisWeek, goalsCompletionCounts)
    .select({
      id: goalsCreatedUpToThisWeek.id,
      title: goalsCreatedUpToThisWeek.title,
      desiredWeeklyFrequency: goalsCreatedUpToThisWeek.desiredWeeklyFrequency,
      completionCount:
        sql`COALESCE(${goalsCompletionCounts.completionCount}, 0)`.mapWith(
          Number
        ),
    })
    .from(goalsCreatedUpToThisWeek)
    .orderBy(asc(goalsCreatedUpToThisWeek.createAt))
    .leftJoin(
      goalsCompletionCounts,
      eq(goalsCreatedUpToThisWeek.id, goalsCompletionCounts.goalId)
    )

  return { pendingGoals }
}
