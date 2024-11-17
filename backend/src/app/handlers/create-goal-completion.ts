import { and, between, count, eq, sql } from 'drizzle-orm'
import { z } from 'zod'

import db from '@/db'
import { goalCompletions, goals } from '@/db/schema'

export const createGoalCompletionSchema = z.object({
  goalId: z.string().uuid(),
})

type CreateGoalCompletionRequest = z.infer<typeof createGoalCompletionSchema>

export default async function createGoalCompletionHandler(
  req: CreateGoalCompletionRequest
) {
  const startOfWeek = new Date()
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())
  startOfWeek.setHours(0, 0, 0, 0)
  const endOfWeek = new Date()
  endOfWeek.setDate(startOfWeek.getDate() + 6)
  endOfWeek.setHours(23, 59, 59, 999)

  const goalCompletionCounts = db.$with('goal_completion_counts').as(
    db
      .select({
        goalId: goalCompletions.goalId,
        completionCount: count(goalCompletions.id).as('completionCount'),
      })
      .from(goalCompletions)
      .where(
        and(
          eq(goalCompletions.goalId, req.goalId),
          between(goalCompletions.createdAt, startOfWeek, endOfWeek)
        )
      )
      .groupBy(goalCompletions.goalId)
  )

  const [{ completionCount, desiredWeeklyFrequency }] = await db
    .with(goalCompletionCounts)
    .select({
      desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
      completionCount:
        sql`COALESCE(${goalCompletionCounts.completionCount}, 0)`.mapWith(
          Number
        ),
    })
    .from(goals)
    .leftJoin(goalCompletionCounts, eq(goals.id, goalCompletionCounts.goalId))
    .where(eq(goals.id, req.goalId))
    .limit(1)

  if (completionCount >= desiredWeeklyFrequency) {
    throw new Error('Cannot complete more than the desired weekly frequency')
  }

  const [goalCompletion] = await db
    .insert(goalCompletions)
    .values({
      goalId: req.goalId,
    })
    .returning()

  return { goalCompletion }
}
