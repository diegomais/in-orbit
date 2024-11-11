import { z } from 'zod'

import db from '@/db'
import { goals } from '@/db/schema'

export const createGoalSchema = z.object({
  title: z.string(),
  desiredWeeklyFrequency: z.number().int().min(1).max(7),
})

type CreateGoalRequest = z.infer<typeof createGoalSchema>

export default async function createGoalHandler(req: CreateGoalRequest) {
  const [goal] = await db.insert(goals).values(req).returning()
  return { goal }
}
